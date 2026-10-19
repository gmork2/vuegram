FROM python:3.14-slim

ENV PYTHONDONTWRITEBYTECODE=1 \
    PYTHONUNBUFFERED=1 \
    UV_LINK_MODE=copy

WORKDIR /app

RUN pip install --no-cache-dir uv

COPY pyproject.toml uv.lock README.md ./
COPY vuegram ./vuegram

RUN uv sync --frozen --no-dev

RUN useradd --create-home --uid 10001 appuser && chown -R appuser:appuser /app
USER appuser

EXPOSE 8080

ENV HOST=0.0.0.0 \
    PORT=8080

CMD ["uv", "run", "python", "vuegram/main.py"]
