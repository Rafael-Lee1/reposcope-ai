# Arquitetura

## Objetivo

Construir uma aplicação Serverless para análise de repositórios GitHub.

## Arquitetura planejada

Frontend
    |
    v
API Gateway
    |
    v
AWS Lambda
    |
    v
GitHub API

## Infraestrutura

Toda a infraestrutura será provisionada com Terraform.

## Estratégia de custo

A aplicação será construída priorizando:

- Serviços Serverless
- Recursos dentro de camadas gratuitas quando disponíveis
- Ausência de recursos permanentemente ligados
- Nenhuma infraestrutura desnecessária

