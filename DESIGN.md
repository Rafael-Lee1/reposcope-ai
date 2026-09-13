# RepoScope AI — Design System & Creative Direction

## Document Purpose

This document is the mandatory design authority for the RepoScope AI frontend.

It defines:

- visual direction;
- design philosophy;
- interaction principles;
- motion guidelines;
- component behavior;
- reference sources;
- accessibility requirements;
- performance constraints;
- implementation rules.

Every AI agent, developer, or contributor working on the frontend MUST read and follow this document before making visual, UX, layout, animation, or interaction changes.

This document is not merely descriptive documentation.

It is a prescriptive design directive.

When there is uncertainty about a design decision, the principles in this document take priority.

# AI DESIGN EXECUTION PROTOCOL

Before modifying the frontend, the AI MUST:

1. Read this DESIGN.md completely.

2. Inspect the current implementation.

3. Identify the difference between:
   - current implementation;
   - intended design direction.

4. Never introduce a new visual pattern without a clear reason.

5. Do not optimize for:
   - number of animations;
   - visual complexity;
   - number of effects.

6. Optimize for:
   - hierarchy;
   - information clarity;
   - meaningful motion;
   - interaction quality;
   - compositional rhythm;
   - product identity.

7. Every animation must answer:

   "What information or interaction does this motion communicate?"

8. Decorative motion is allowed only for:
   - ambient depth;
   - spatial orientation;
   - perceived system activity.

9. The AI must avoid:

   - dashboard templates;
   - repeated card patterns;
   - uniform spacing everywhere;
   - identical metric components;
   - animation applied to every element;
   - excessive entrance animations.

10. After implementation, the AI MUST audit:

   - npm run typecheck
   - npm run lint
   - npm run build

11. The AI MUST inspect the result in the browser.

12. The AI MUST report:

   - what changed;
   - why it changed;
   - which DESIGN.md principles were applied;
   - what was intentionally NOT changed.

---

# 1. Product Identity

## Product Name

RepoScope AI

## Product Category

Developer Tool / AI-Assisted Repository Intelligence Platform.

## Core Purpose

RepoScope AI analyzes public GitHub repositories and transforms technical repository data into understandable engineering insights.

The application should help users quickly understand:

- repository activity;
- technical maturity;
- detected technologies;
- engineering signals;
- strengths;
- potential attention points;
- overall technical quality.

The product should feel like an intelligent engineering tool.

It must NOT feel like:

- a generic admin dashboard;
- a Bootstrap template;
- a cryptocurrency dashboard;
- a marketing landing page;
- a static data table.

---

# 2. Product Personality

RepoScope AI should communicate the following characteristics:

- Intelligent
- Technical
- Modern
- Analytical
- Trustworthy
- Precise
- Dynamic
- Premium
- Experimental, but controlled

The visual experience should combine:

Developer Tool
+
AI Product
+
Data Intelligence
+
Modern Editorial Design
+
Meaningful Motion

The user should feel:

> "This application is actively analyzing technical information."

The interface should feel alive without becoming distracting.

---

# 3. Design Philosophy

The central design principle of RepoScope AI is:

# Intelligence in Motion

The interface should communicate that data is being:

- collected;
- processed;
- interpreted;
- evaluated;
- transformed into insights.

Motion should reinforce this idea.

Animations are not decorative by default.

Every animation should have a purpose.

Motion can communicate:

- system activity;
- hierarchy;
- progress;
- relationships;
- feedback;
- transitions;
- state changes.

Avoid animation for animation's sake.

---

# 4. Core Design Principles

## 4.1 Meaningful Motion

Motion must communicate something.

Examples:

Good:

- metrics animate when analysis results arrive;
- score values count toward their final value;
- progress bars grow according to real values;
- sections reveal progressively;
- stack technologies appear as analysis results;
- hover states provide feedback.

Bad:

- random spinning objects;
- continuous bouncing;
- excessive floating animations;
- animations that delay interaction;
- motion unrelated to user actions.

---

## 4.2 Progressive Disclosure

Information should appear in a controlled sequence.

Avoid showing everything at once.

The analysis experience should feel like:

1. Repository selected
2. Analysis initiated
3. System processing
4. Score generated
5. Metrics revealed
6. Technical signals presented
7. Insights surfaced

This creates a narrative.

The UI should feel like an analytical process rather than a static page refresh.

---

## 4.3 Data Should Feel Physical

Important values should have visual weight.

Scores, metrics and indicators should not feel like plain text.

Examples:

- technical score;
- activity score;
- maturity score;
- stars;
- forks;
- issues.

Use:

- scale;
- typography;
- spacing;
- progress;
- subtle motion;
- visual hierarchy.

The user should immediately understand:

> What matters most?

---

## 4.4 Controlled Complexity

RepoScope AI is a technical product.

Complexity is acceptable.

Confusion is not.

The UI should make complex information feel understandable.

Avoid:

- excessive visual noise;
- unnecessary decoration;
- too many simultaneous colors;
- too many competing animations.

---

# 5. Visual Direction

## Overall Style

The interface should follow a modern technical aesthetic.

Characteristics:

- dark interface;
- deep visual layers;
- subtle gradients;
- controlled glow;
- glass-like surfaces where appropriate;
- strong typography;
- generous spacing;
- precise borders;
- subtle depth;
- ambient motion.

The interface should feel closer to:

- modern AI tools;
- premium developer platforms;
- experimental digital products.

It should NOT resemble:

- a traditional enterprise dashboard;
- an outdated admin panel;
- a generic SaaS template.

---

# 6. Color System

The existing project color palette should be preserved unless there is a justified reason to evolve it.

The color system should prioritize:

## Primary Colors

Deep neutral backgrounds.

Examples of visual roles:

- application background;
- elevated surface;
- interactive surface;
- border;
- muted text;
- primary text.

## Accent Colors

Accent colors should communicate meaning.

Possible semantic roles:

- purple / violet → AI / intelligence;
- blue → information / technology;
- green → positive / healthy;
- amber → warning / attention;
- red → error / critical issue.

Do not introduce colors randomly.

Every accent color must have a semantic or visual purpose.

---

# 7. Background System

The application background should not necessarily be completely static.

Use subtle ambient layers.

Possible techniques:

- radial gradients;
- soft blurred light sources;
- animated gradient positioning;
- subtle noise;
- low-opacity grid patterns;
- slowly moving background elements.

Background motion must remain subtle.

The user should notice the interface feels alive without consciously focusing on the animation.

Avoid:

- aggressive particle systems;
- distracting moving backgrounds;
- high-contrast animated gradients;
- effects that reduce readability.

---

# 8. Surface Design

Cards should feel like surfaces within a visual system.

Do not rely exclusively on rectangular boxes.

Cards may use:

- subtle transparency;
- layered backgrounds;
- thin borders;
- soft shadows;
- hover elevation;
- gradient borders;
- controlled glow.

However:

Glassmorphism must be used carefully.

Do not make every component transparent.

The interface needs visual hierarchy.

Use different surface levels.

Example:

Level 0
Application background

Level 1
Primary sections

Level 2
Cards

Level 3
Interactive elements

---

# 9. Typography

Typography should communicate hierarchy.

Use clear differences between:

- page title;
- section title;
- score;
- metric value;
- metric label;
- supporting text;
- metadata.

Important values should be visually dominant.

Example hierarchy:

Repository Name

Technical Score

Metric Value

Section Title

Supporting Description

Metadata

Avoid making all text similar in size or weight.

---

# 10. Layout Principles

Use a strong layout system.

Prioritize:

- whitespace;
- alignment;
- grouping;
- hierarchy;
- predictable spacing.

Avoid:

- excessive density;
- random spacing;
- inconsistent card sizes;
- unnecessary separators.

Sections should breathe.

Important information should not compete with secondary information.

---

# 11. Motion System

Motion is a core part of RepoScope AI.

Animations should be divided into categories.

---

## 11.1 Entry Animations

Elements may animate when entering the viewport.

Recommended behavior:

- opacity transition;
- subtle vertical translation;
- small scale transition.

Avoid large movement.

Recommended concept:

opacity: 0 → 1

translateY: 12px → 0

scale: 0.98 → 1

Animations should feel fast and confident.

Avoid slow animations.

---

## 11.2 Staggered Reveal

When multiple related elements appear, use staggered animation.

Examples:

Metrics:

1. Stars
2. Forks
3. Issues
4. Watchers

Stack technologies:

1. Python
2. FastAPI
3. REST API
4. Artificial Intelligence

The delay should be subtle.

Do not make users wait for content.

---

## 11.3 Hover Interaction

Interactive elements should respond to the user.

Possible effects:

- subtle elevation;
- border color change;
- background shift;
- icon movement;
- small scale increase;
- glow increase.

Hover effects should be fast.

Recommended feeling:

Responsive.

Not theatrical.

---

## 11.4 Click Feedback

Buttons should provide feedback.

Possible behaviors:

- scale slightly down;
- background transition;
- icon movement;
- loading indicator.

Users should always understand that their action was registered.

---

# 12. Score Animation

The Technical Score is one of the most important visual elements.

It should feel significant.

Recommended behavior:

When analysis results arrive:

1. Score container appears.
2. Visual indicator activates.
3. Score counts toward its final value.
4. Classification appears.
5. Supporting information reveals.

Example:

0

↓

25

↓

47

↓

72

↓

85

The animation must remain fast.

Do not artificially delay results.

---

# 13. Progress Indicators

Progress bars should not appear instantly.

They should animate toward their real value.

Examples:

Activity:

0% → 100%

Maturity:

0% → 50%

The animation should reinforce the idea that the system is presenting measured information.

Avoid fake progress.

Values must always reflect actual API data.

---

# 14. Analysis Experience

The user flow should feel intentional.

Recommended experience:

## Step 1

Initial State

The interface communicates:

> Analyze a GitHub repository.

The user understands immediately what to do.

---

## Step 2

Repository Input

The input should feel like an important interaction.

It may include:

- GitHub icon;
- repository placeholder;
- example repository;
- clear action button.

Example:

Rafael-Lee1/contractguard-ai

---

## Step 3

Analysis Initiated

The UI should communicate processing.

Use meaningful loading states.

Possible visual elements:

- scanning indicator;
- animated progress;
- pulsing analysis nodes;
- changing analysis messages.

Example messages:

Analyzing repository metadata...

Inspecting engineering signals...

Detecting technologies...

Evaluating repository activity...

Generating technical insights...

Messages should not imply actions that the backend is not actually performing.

Avoid misleading users.

---

## Step 4

Results Reveal

Results should not simply appear abruptly.

Recommended sequence:

1. Repository overview
2. Technical score
3. Core metrics
4. Activity and maturity
5. Detected stack
6. Strengths
7. Attention points

The sequence should be fast.

---

# 15. Loading States

Loading states should communicate activity.

Avoid a generic spinner as the only loading mechanism.

Preferred approach:

Combine:

- subtle animated icon;
- analysis messages;
- progress indication;
- skeleton surfaces.

Loading should feel like:

> The system is working.

Not:

> The application is frozen.

---

# 16. Empty State

The initial state is part of the product experience.

It should not be visually empty.

It may include:

- subtle repository visualization;
- abstract Git nodes;
- code-inspired shapes;
- animated connection lines;
- low-opacity technical patterns.

The initial state should encourage interaction.

The user should immediately understand:

What can I analyze?

How do I start?

---

# 17. Error States

Errors should be helpful.

Do not display raw technical errors directly to users.

Instead communicate:

What happened?

What can the user do?

Example:

Repository not found.

Check the repository owner and repository name.

Provide:

- clear explanation;
- retry action;
- preserved input when possible.

---

# 18. Repository Overview

Repository information should establish context.

Possible information:

- repository name;
- owner;
- description;
- primary language;
- license;
- default branch.

The repository identity should be visually distinct from metrics.

The user should first understand:

What repository am I looking at?

Then:

How healthy or mature is it?

---

# 19. Metrics Visualization

Metrics should not all look identical.

Different information types may use different visual treatments.

Examples:

Stars

Signal of repository popularity.

Forks

Signal of reuse or experimentation.

Issues

Signal requiring interpretation.

Watchers

Interest indicator.

Do not use charts unless they improve understanding.

A chart should answer a question.

Do not add charts merely because dashboards usually have charts.

---

# 20. Technical Score

The Technical Score should be the visual anchor of the analysis.

It should communicate:

- score;
- classification;
- confidence;
- supporting signals.

Possible classifications:

Excellent

Strong

Promising

Developing

Needs Attention

Visual treatment should change according to classification.

However:

Avoid excessive semantic colors.

The overall design system should remain cohesive.

---

# 21. Activity Visualization

Repository activity should communicate freshness.

Potential indicators:

- recent;
- active;
- moderate;
- inactive.

The UI may use:

- progress;
- status indicator;
- relative dates;
- subtle visual signals.

Example:

Last Push

13 days ago

Activity

Very Active

---

# 22. Maturity Visualization

Maturity represents repository engineering signals.

It should feel distinct from activity.

Activity answers:

> Is the repository being worked on?

Maturity answers:

> How developed or structured does the repository appear?

Do not visually treat them as identical concepts.

---

# 23. Detected Stack

Detected technologies should feel like discovered information.

Recommended behavior:

Technologies appear progressively.

Example:

Python

↓

FastAPI

↓

REST API

↓

Artificial Intelligence

Use:

- tags;
- pills;
- icons;
- grouping.

Avoid excessive rainbow colors.

Technology colors should remain controlled.

---

# 24. Strengths

Strengths should communicate positive engineering signals.

Use positive visual language.

Examples:

- check icon;
- subtle green accent;
- positive indicator.

Avoid overwhelming the interface with green.

The content is more important than the decoration.

---

# 25. Attention Points

Attention points should communicate opportunities.

Avoid making every attention point look like an error.

Examples:

Consider adding a software license.

This is not necessarily a critical error.

Use:

- amber;
- information icon;
- attention indicator.

Reserve red for actual critical errors.

---

# 26. Microinteractions

Microinteractions are important.

Examples:

Button hover.

Input focus.

Card hover.

Icon movement.

Tooltip appearance.

Progress update.

Score counting.

Technology tag appearance.

These interactions should make the product feel polished.

They should not distract from the analytical content.

---

# 27. Scroll Experience

Scrolling should feel natural.

Sections may reveal when entering the viewport.

Use subtle transitions.

Do not animate every element independently.

Prefer section-level choreography.

Example:

Section enters.

↓

Title appears.

↓

Content reveals.

↓

Supporting elements appear.

---

# 28. Motion Timing

Recommended animation characteristics:

Fast interactions:

100ms – 200ms

Standard transitions:

200ms – 400ms

Section reveals:

300ms – 600ms

Ambient animation:

Several seconds

Ambient animations must remain subtle.

Avoid excessive delays.

The interface should always feel responsive.

---

# 29. Animation Curves

Prefer natural easing.

Examples:

ease-out

ease-in-out

Custom cubic-bezier curves when necessary.

Avoid linear animation for interface transitions unless the effect specifically requires it.

Motion should feel:

- responsive;
- intentional;
- smooth.

---

# 30. Ambient Motion

RepoScope AI may use ambient motion.

Examples:

- slowly moving gradient;
- subtle glow;
- floating background element;
- animated grid;
- pulsing connection.

Ambient motion should have:

Low opacity.

Low speed.

Low visual priority.

The user should not need to consciously notice it.

---

# 31. Interactive Background Elements

Background elements may react to:

- mouse movement;
- cursor position;
- scroll position.

Examples:

Subtle parallax.

Gradient movement.

Glow following the cursor.

This should be implemented carefully.

Do not reduce performance.

Do not create effects that interfere with usability.

---

# 32. Cursor Interaction

Cursor-based effects are optional.

Examples:

- magnetic buttons;
- subtle light response;
- interactive cards.

Use only when they improve the experience.

Do not add cursor effects everywhere.

---

# 33. Data Visualization Principles

Before adding a chart, ask:

What question does this visualization answer?

If the chart does not improve understanding, do not add it.

Possible future visualizations:

- repository activity timeline;
- language distribution;
- engineering signal radar;
- score breakdown;
- repository evolution.

All visualizations must be based on real data.

Do not generate fake analytical data.

---

# 34. Reference Sources

The following sources are visual and interaction references.

They should inspire principles.

They must NOT be copied directly.

---

## Motion Design

https://motionsites.ai/

Reference for:

- modern web motion;
- transitions;
- interactive experiences;
- creative choreography.

---

## UI Inspiration

https://collectui.com/

Reference for:

- interface patterns;
- component ideas;
- interaction patterns.

---

## Modern Digital Design

https://recent.design/

Reference for:

- contemporary web design;
- visual trends;
- modern product interfaces.

---

## Product Design References

https://styles.refero.design/

Reference for:

- interface composition;
- SaaS design;
- product design systems.

---

## Experimental Interaction

https://www.seesaw.website/

Reference for:

- experimental web experiences;
- interaction;
- visual storytelling.

---

## AI Design Inspiration

https://sceneai.art/

Reference for:

- AI-oriented visual experiences;
- experimental interfaces;
- creative digital products.

---

## Product Inspiration

https://www.spottedinprod.com/

Reference for:

- digital product experiences;
- modern interfaces;
- creative UI solutions.

---

## Design Inspiration

https://posts.design/

Reference for:

- visual composition;
- typography;
- interaction;
- creative presentation.

---

# 35. How References Must Be Used

AI agents must NOT copy layouts directly.

Instead, analyze references according to:

1. Motion
2. Interaction
3. Hierarchy
4. Typography
5. Spacing
6. Color
7. Depth
8. Composition
9. Storytelling
10. User attention

Ask:

What principle makes this experience effective?

Do not ask:

How can I copy this website?

---

# 36. Preferred Technology Strategy

Before adding dependencies, inspect the current project.

Prefer native capabilities when sufficient.

Priority:

1. CSS
2. Existing project capabilities
3. Lightweight libraries
4. New dependencies

Do not add dependencies without justification.

---

# 37. Animation Libraries

When advanced animation is necessary, evaluate appropriate libraries.

Potential options include:

- Framer Motion
- Motion
- GSAP

Do not install multiple animation libraries unnecessarily.

Choose one strategy.

Before installation:

1. Verify whether CSS is sufficient.
2. Evaluate bundle impact.
3. Confirm compatibility.
4. Avoid duplicate functionality.

---

# 38. React Implementation Principles

Components should remain focused.

Avoid giant components.

Separate:

- presentation;
- data;
- interaction;
- utility logic.

Example:

Good:

ScoreCard

MetricsGrid

ProgressBar

AnalysisSection

StackSection

LoadingState

ErrorState

RepositoryOverview

Avoid:

App.tsx containing the entire application.

---

# 39. Component Animation Rules

Components should own their local interactions.

Examples:

ScoreCard

Responsible for:

- score animation;
- classification reveal.

ProgressBar

Responsible for:

- progress transition.

RepositoryForm

Responsible for:

- input interaction;
- submission feedback.

Avoid centralizing all animations inside App.tsx.

---

# 40. Responsive Design

RepoScope AI must work across:

- desktop;
- laptop;
- tablet;
- mobile.

Do not treat mobile as a compressed desktop.

Prioritize content.

On smaller screens:

- reduce animation complexity;
- simplify layouts;
- preserve readability;
- maintain touch-friendly controls.

---

# 41. Accessibility

Motion must respect accessibility.

Support:

prefers-reduced-motion.

When reduced motion is enabled:

- remove unnecessary animations;
- reduce ambient movement;
- preserve essential state transitions.

Never rely exclusively on:

- color;
- motion;
- hover.

Information must remain understandable.

---

# 42. Performance

Performance is mandatory.

Avoid:

- unnecessary re-renders;
- expensive continuous animations;
- large animation libraries without justification;
- excessive blur;
- too many box shadows;
- large particle systems;
- unnecessary canvas rendering.

Animation must not make the application feel slower.

---

# 43. Performance Rule

If a visual effect improves appearance but significantly harms:

- performance;
- readability;
- accessibility;
- maintainability;

Do not use it.

The best design is not the one with the most effects.

The best design is the one with the best balance.

---

# 44. Avoid Generic AI Design

Avoid the common "AI dashboard template" appearance.

Do not automatically add:

- glowing purple everything;
- floating random particles;
- excessive gradients;
- generic robot icons;
- unnecessary charts;
- fake data;
- meaningless animations.

RepoScope AI must have its own identity.

---

# 45. Avoid Overdesign

Do not attempt to animate everything.

Too much animation creates:

- visual fatigue;
- cognitive overload;
- poor performance;
- reduced usability.

Motion should establish hierarchy.

Important things move.

Secondary things remain stable.

---

# 46. Avoid Fake Intelligence

The interface must not claim capabilities the backend does not have.

Do not display:

AI Confidence: 98%

unless this value actually exists.

Do not display:

Machine Learning Analysis

unless machine learning is actually being used.

Do not simulate:

- fake insights;
- fake scanning;
- fake metrics.

The frontend must represent real system capabilities.

---

# 47. Design Evolution

The design system is allowed to evolve.

However:

Do not redesign the entire application for every change.

Prefer incremental improvement.

Before major visual changes:

1. Inspect the current implementation.
2. Identify the problem.
3. Propose the improvement.
4. Implement incrementally.
5. Validate visually.
6. Validate technically.

---

# 48. AI Mandatory Workflow

Before making visual changes, the AI MUST:

## Step 1

Read DESIGN.md completely.

## Step 2

Inspect the current implementation.

## Step 3

Identify:

- existing components;
- current design system;
- existing dependencies;
- current animation strategy.

## Step 4

Determine the actual problem.

Do not change something simply because it could look different.

## Step 5

Propose a solution consistent with:

- product identity;
- design philosophy;
- performance requirements.

## Step 6

Implement the solution.

## Step 7

Run:

npm run typecheck

npm run lint

npm run build

Fix errors before proceeding.

## Step 8

Inspect the application.

Verify:

- layout;
- responsiveness;
- interaction;
- animation;
- console errors.

## Step 9

Audit the changes.

Confirm:

Did the change improve the product?

Or did it merely add visual complexity?

---

# 49. Mandatory AI Audit

After implementing visual changes, the AI must perform an internal audit.

Verify:

## Design

- Does this follow DESIGN.md?
- Does this improve hierarchy?
- Does this preserve the product identity?

## Motion

- Does every animation have a purpose?
- Are animations too slow?
- Are there too many simultaneous effects?

## Performance

- Are there unnecessary dependencies?
- Are animations expensive?
- Are there unnecessary re-renders?

## Accessibility

- Does reduced motion work?
- Is contrast sufficient?
- Is information understandable without color?

## Technical Quality

- Does TypeScript pass?
- Does ESLint pass?
- Does the production build succeed?

---

# 50. Definition of Done

A frontend design task is NOT complete simply because the interface renders.

A task is complete when:

- the implementation works;
- the design follows this document;
- motion is meaningful;
- responsiveness is verified;
- accessibility is considered;
- performance is acceptable;
- TypeScript passes;
- ESLint passes;
- the production build succeeds;
- no unnecessary dependencies were introduced.

---

# 51. Design Decision Hierarchy

When making design decisions, prioritize:

1. Usability
2. Information clarity
3. Product identity
4. Performance
5. Accessibility
6. Meaningful interaction
7. Visual quality
8. Decorative effects

Decoration is always lower priority than usability.

---

# 52. Future Vision

RepoScope AI should evolve from:

A repository information viewer

into:

A repository intelligence platform.

The interface should be prepared to eventually support:

- repository comparisons;
- historical analysis;
- score evolution;
- engineering insights;
- architecture detection;
- technology analysis;
- repository health indicators;
- AI-assisted recommendations.

Future features should extend the design system.

They should not require a complete visual rewrite.

---

# 53. Final Design Principle

RepoScope AI should not attempt to impress users with random visual effects.

It should impress users because:

The interface feels intelligent.

The information feels clear.

Interactions feel responsive.

Motion feels intentional.

The experience feels modern.

The product feels engineered.

The ultimate goal is:

A premium, dynamic, intelligent repository analysis experience that feels alive without becoming distracting.

---

# AI FINAL INSTRUCTION

Before modifying any frontend visual, UX, animation, interaction, layout, or component behavior:

READ THIS DOCUMENT.

Do not ignore existing architecture.

Do not blindly redesign working components.

Do not introduce dependencies without justification.

Do not add animation without purpose.

Do not create fake analytical capabilities.

Do not sacrifice performance for visual effects.

Prefer meaningful interaction over decoration.

Prefer clarity over complexity.

Prefer refinement over unnecessary redesign.

The goal is not to make the interface look "cool".

The goal is to make RepoScope AI feel:

INTELLIGENT.

TECHNICAL.

MODERN.

PREMIUM.

ALIVE.
