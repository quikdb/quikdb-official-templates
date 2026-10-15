FROM cgr.dev/chainguard/python:latest-dev AS builder
ENV LANG=C.UTF-8 PYTHONDONTWRITEBYTECODE=1 PYTHONUNBUFFERED=1
WORKDIR /app
RUN python -m venv --without-pip /app/venv
COPY requirements.txt ./
RUN pip --python /app/venv/bin/python install --no-cache-dir -r requirements.txt

FROM cgr.dev/chainguard/python:latest
ENV PYTHONDONTWRITEBYTECODE=1 PYTHONUNBUFFERED=1 PORT=8000 PATH="/venv/bin:$PATH"
WORKDIR /app
COPY --from=builder /app/venv /venv
COPY . .
EXPOSE 8000
HEALTHCHECK --interval=20s --timeout=3s --start-period=10s CMD ["python", "-c", "import urllib.request; assert b'quikdb-template-django-web-v1' in urllib.request.urlopen('http://127.0.0.1:8000/health').read()"]
ENTRYPOINT ["python", "-m", "gunicorn"]
CMD ["--preload", "--bind", "0.0.0.0:8000", "--workers", "2", "--threads", "2", "starter.wsgi:application"]
