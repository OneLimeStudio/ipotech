# server.py
from flask import Flask, jsonify, request
from flask_cors import CORS
import requests
from bs4 import BeautifulSoup
from urllib.parse import urljoin
import time

app = Flask(__name__)
CORS(app)

HEADERS = {
    "User-Agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64)",
    "Referer": "https://ipowatch.in/"
}

# simple in-memory cache to avoid hammering the site during development
_cache = {"ts": 0, "data": None, "ttl": 60}  # ttl seconds

def parse_ipowatch_table(soup):
    """Return list of dicts parsed from the table you pasted (column-1..column-5)."""
    results = []
    # try the tbody class used in the HTML you pasted, fallback to first table
    tbody = soup.find("tbody", class_="row-striping row-hover")
    if not tbody:
        table = soup.find("table")
        tbody = table.find("tbody") if table else None
    if not tbody:
        return results

    for tr in tbody.find_all("tr"):
        tds = tr.find_all("td")
        if not tds:
            continue
        a = tds[0].find("a")
        company = a.get_text(strip=True) if a else tds[0].get_text(strip=True)
        link = urljoin("https://ipowatch.in/", a["href"]) if a and a.get("href") else ""
        dates = tds[1].get_text(strip=True) if len(tds) > 1 else ""
        board = tds[2].get_text(strip=True) if len(tds) > 2 else ""
        issue_size = tds[3].get_text(strip=True) if len(tds) > 3 else ""
        price_band = tds[4].get_text(strip=True) if len(tds) > 4 else ""
        results.append({
            "company": company,
            "link": link,
            "dates": dates,
            "board": board,
            "issue_size": issue_size,
            "price_band": price_band
        })
    return results

@app.route("/api/ipos", methods=["GET"])
def api_ipos():
    """
    Query usage:
      /api/ipos?url=https://ipowatch.in/your-page/
      or
      /api/ipos?url=local   <-- reads sample.html in this folder
    """
    # url = request.args.get("url")
    url = "https://ipowatch.in/"
    if not url:
        return jsonify({"error": "missing ?url= param. Use ?url=https://... or ?url=local"}), 400

    # use cache when scraping same URL repeatedly during dev
    now = time.time()
    if _cache["data"] and (now - _cache["ts"]) < _cache["ttl"]:
        return jsonify(_cache["data"])

    try:
        if url == "local":
            with open("sample.html", "r", encoding="utf-8") as f:
                html = f.read()
        else:
            r = requests.get(url, headers=HEADERS, timeout=15)
            r.raise_for_status()
            html = r.text

        soup = BeautifulSoup(html, "html.parser")
        items = parse_ipowatch_table(soup)
        _cache.update({"ts": now, "data": items})
        return jsonify(items)
    except Exception as e:
        return jsonify({"error": str(e)}), 500

# if __name__ == "__main__":z
print("Starting Flask server on http://127.0.0.1:5000")
app.run(port=5000, debug=True)
