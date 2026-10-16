FROM cgr.dev/chainguard/python:latest-dev AS builder
ENV LANG=C.UTF-8 PYTHONDONTWRITEBYTECODE=1 PYTHONUNBUFFERED=1
WORKDIR /app
RUN python -m venv --without-pip /tmp/venv
COPY requirements.txt ./
RUN pip --python /tmp/venv/bin/python install --no-cache-dir -r requirements.txt

FROM cgr.dev/chainguard/python:latest
ENV PYTHONDONTWRITEBYTECODE=1 PYTHONUNBUFFERED=1 PORT=5000 PATH="/venv/bin:$PATH"
WORKDIR /app
COPY --from=builder /tmp/venv /venv
COPY app.py ./
EXPOSE 5000
HEALTHCHECK --interval=20s --timeout=3s --start-period=10s CMD ["python", "-c", "import urllib.request; assert b'quikdb-template-python-flask-v1' in urllib.request.urlopen('http://127.0.0.1:5000/health').read()"]
ENTRYPOINT ["python", "-m", "gunicorn"]
CMD ["--bind", "0.0.0.0:5000", "--workers", "2", "--threads", "2", "app:app"]
