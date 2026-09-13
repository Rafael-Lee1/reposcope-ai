from datetime import datetime, timezone
from typing import Any

import httpx
from fastapi import FastAPI, HTTPException
from fastapi.middleware.cors import CORSMiddleware


app = FastAPI(
    title="RepoScope AI API",
    description=(
        "API para análise técnica de repositórios GitHub. "
        "O sistema coleta dados públicos e gera indicadores técnicos."
    ),
    version="1.1.0",
)


app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=False,
    allow_methods=["*"],
    allow_headers=["*"],
)


@app.get("/")
async def root():
    return {
        "name": "RepoScope AI API",
        "status": "online",
        "version": "1.1.0",
    }


@app.get("/health")
async def health():
    return {
        "status": "healthy",
    }


def calculate_days_since(date_string: str | None) -> int | None:
    if not date_string:
        return None

    date_value = datetime.fromisoformat(
        date_string.replace("Z", "+00:00")
    )

    now = datetime.now(timezone.utc)

    return max(
        0,
        (now - date_value).days,
    )


def detect_stack(
    language: str | None,
    topics: list[str],
    description: str | None,
) -> list[str]:

    detected = []

    searchable_content = " ".join(
        [
            language or "",
            description or "",
            " ".join(topics),
        ]
    ).lower()

    technology_keywords = {
        "React": ["react"],
        "Next.js": ["next.js", "nextjs"],
        "Angular": ["angular"],
        "Vue.js": ["vue", "vuejs"],
        "TypeScript": ["typescript"],
        "JavaScript": ["javascript"],
        "Python": ["python"],
        "FastAPI": ["fastapi"],
        "Django": ["django"],
        "Flask": ["flask"],
        "Node.js": ["node", "nodejs"],
        "Docker": ["docker"],
        "AWS": ["aws", "amazon web services"],
        "Terraform": ["terraform"],
        "MongoDB": ["mongodb", "mongo"],
        "PostgreSQL": ["postgresql", "postgres"],
        "MySQL": ["mysql"],
        "Machine Learning": [
            "machine learning",
            "machine-learning",
            "ml",
        ],
        "Artificial Intelligence": [
            "artificial intelligence",
            "ai",
        ],
        "REST API": ["api", "rest"],
    }

    for technology, keywords in technology_keywords.items():

        if any(
            keyword in searchable_content
            for keyword in keywords
        ):
            detected.append(technology)

    if language and language not in detected:
        detected.insert(0, language)

    return list(dict.fromkeys(detected))


def calculate_activity_score(
    days_since_push: int | None,
) -> tuple[int, str]:

    if days_since_push is None:
        return 0, "unknown"

    if days_since_push <= 30:
        return 100, "very_active"

    if days_since_push <= 90:
        return 80, "active"

    if days_since_push <= 180:
        return 60, "moderate"

    if days_since_push <= 365:
        return 40, "low"

    return 20, "inactive"


def calculate_maturity(
    stars: int,
    forks: int,
    size_kb: int,
    has_license: bool,
    has_description: bool,
    open_issues: int,
) -> tuple[int, str]:

    score = 0

    if has_description:
        score += 15

    if has_license:
        score += 15

    if size_kb > 100:
        score += 15

    if size_kb > 500:
        score += 10

    if stars > 0:
        score += 10

    if forks > 0:
        score += 10

    if open_issues >= 0:
        score += 5

    if score >= 60:
        level = "mature"
    elif score >= 35:
        level = "developing"
    else:
        level = "early_stage"

    return min(score, 100), level


def calculate_technical_score(
    activity_score: int,
    maturity_score: int,
    has_description: bool,
    has_license: bool,
    language: str | None,
    size_kb: int,
) -> int:

    score = 0

    score += activity_score * 0.30
    score += maturity_score * 0.30

    if has_description:
        score += 10

    if has_license:
        score += 10

    if language:
        score += 10

    if size_kb > 100:
        score += 10

    return min(
        100,
        round(score),
    )


def classify_repository(
    technical_score: int,
) -> str:

    if technical_score >= 85:
        return "excellent"

    if technical_score >= 70:
        return "strong"

    if technical_score >= 50:
        return "promising"

    if technical_score >= 30:
        return "developing"

    return "early_stage"


def generate_insights(
    repository: dict[str, Any],
    activity_status: str,
    maturity_level: str,
    technical_score: int,
) -> tuple[list[str], list[str]]:

    strengths = []
    attention_points = []

    if repository.get("description"):
        strengths.append(
            "Repository has a documented project description."
        )
    else:
        attention_points.append(
            "Add a clear repository description."
        )

    if repository.get("license"):
        strengths.append(
            "Repository includes an open-source license."
        )
    else:
        attention_points.append(
            "Consider adding a software license."
        )

    if activity_status in [
        "very_active",
        "active",
    ]:
        strengths.append(
            "Repository shows recent development activity."
        )

    if activity_status in [
        "low",
        "inactive",
    ]:
        attention_points.append(
            "Repository has low recent development activity."
        )

    if repository.get("size", 0) > 500:
        strengths.append(
            "Repository contains a substantial codebase."
        )

    if repository.get("stargazers_count", 0) > 0:
        strengths.append(
            "Repository has community interest through stars."
        )

    if repository.get("forks_count", 0) > 0:
        strengths.append(
            "Repository has been forked by other developers."
        )

    if maturity_level == "early_stage":
        attention_points.append(
            "Repository indicators suggest an early development stage."
        )

    if technical_score >= 70:
        strengths.append(
            "Repository achieved a strong technical portfolio score."
        )

    if technical_score < 50:
        attention_points.append(
            "Technical indicators can be improved for portfolio presentation."
        )

    return strengths, attention_points


@app.get("/api/repositories/{owner}/{repo}")
async def analyze_repository(
    owner: str,
    repo: str,
):

    url = f"https://api.github.com/repos/{owner}/{repo}"

    headers = {
        "Accept": "application/vnd.github+json",
    }

    try:

        async with httpx.AsyncClient(
            timeout=10.0
        ) as client:

            response = await client.get(
                url,
                headers=headers,
            )

    except httpx.RequestError as error:

        raise HTTPException(
            status_code=503,
            detail=(
                f"Unable to connect to GitHub API: "
                f"{str(error)}"
            ),
        )

    if response.status_code == 404:

        raise HTTPException(
            status_code=404,
            detail="Repository not found.",
        )

    if response.status_code != 200:

        raise HTTPException(
            status_code=response.status_code,
            detail="GitHub API request failed.",
        )

    data = response.json()

    stars = data.get("stargazers_count", 0)
    forks = data.get("forks_count", 0)
    open_issues = data.get("open_issues_count", 0)
    size_kb = data.get("size", 0)

    language = data.get("language")
    description = data.get("description")
    license_data = data.get("license")

    topics = data.get("topics", [])

    pushed_at = data.get("pushed_at")

    days_since_push = calculate_days_since(
        pushed_at
    )

    activity_score, activity_status = (
        calculate_activity_score(
            days_since_push
        )
    )

    maturity_score, maturity_level = (
        calculate_maturity(
            stars=stars,
            forks=forks,
            size_kb=size_kb,
            has_license=license_data is not None,
            has_description=description is not None,
            open_issues=open_issues,
        )
    )

    technical_score = calculate_technical_score(
        activity_score=activity_score,
        maturity_score=maturity_score,
        has_description=description is not None,
        has_license=license_data is not None,
        language=language,
        size_kb=size_kb,
    )

    classification = classify_repository(
        technical_score
    )

    stack = detect_stack(
        language=language,
        topics=topics,
        description=description,
    )

    repository_summary = {
        "name": data.get("name"),
        "full_name": data.get("full_name"),
        "description": description,
        "url": data.get("html_url"),
        "language": language,
        "license": (
            license_data.get("name")
            if license_data
            else None
        ),
        "default_branch": data.get(
            "default_branch"
        ),
        "topics": topics,
    }

    strengths, attention_points = (
        generate_insights(
            repository=data,
            activity_status=activity_status,
            maturity_level=maturity_level,
            technical_score=technical_score,
        )
    )

    return {
        "repository": repository_summary,

        "metrics": {
            "stars": stars,
            "forks": forks,
            "open_issues": open_issues,
            "watchers": data.get(
                "subscribers_count",
                0,
            ),
            "size_kb": size_kb,
        },

        "dates": {
            "created_at": data.get(
                "created_at"
            ),
            "updated_at": data.get(
                "updated_at"
            ),
            "pushed_at": pushed_at,
            "days_since_last_push": (
                days_since_push
            ),
        },

        "technical_analysis": {
            "technical_score": technical_score,
            "classification": classification,

            "activity": {
                "score": activity_score,
                "status": activity_status,
            },

            "maturity": {
                "score": maturity_score,
                "level": maturity_level,
            },

            "detected_stack": stack,

            "strengths": strengths,

            "attention_points": (
                attention_points
            ),
        },
    }
