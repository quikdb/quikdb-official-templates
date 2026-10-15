# QuikDB official one-click templates

This public repository is the reviewed source for QuikDB's V1 one-click application catalogue.
Every customer deployment is pinned to an exact commit and one of these six application directories:

- Next.js web application
- React/Vite static site
- Express API
- Node.js API
- Flask API
- Django web application

Each release must pass the catalogue contract, container build, public health-marker check and a
Trivy scan with zero unresolved high or critical vulnerabilities before Device API can publish it.
Customers can inspect the exact source they are about to deploy. Static snippets and general guides
are deliberately excluded from the one-click catalogue.
