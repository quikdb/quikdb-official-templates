FROM python:3.14-slim
ENV PYTHONDONTWRITEBYTECODE=1 PYTHONUNBUFFERED=1 PORT=8000
RUN useradd --create-home --uid 10001 quikdb
WORKDIR /app
COPY requirements.txt ./
RUN pip install --no-cache-dir -r requirements.txt \
  && pip uninstall --yes setuptools urllib3 \
  && rm -rf /usr/local/lib/python3.14/site-packages/pip* /usr/local/bin/pip*
COPY --chown=quikdb:quikdb . .
USER quikdb
EXPOSE 8000
HEALTHCHECK --interval=20s --timeout=3s --start-period=10s CMD python -c "import urllib.request; assert b'quikdb-template-django-web-v1' in urllib.request.urlopen('http://127.0.0.1:8000/health').read()"
CMD ["gunicorn", "--bind", "0.0.0.0:8000", "--workers", "2", "--threads", "2", "starter.wsgi:application"]
