# 📡 Dataking Drone Analytics Dashboard

A full-stack AI-powered dashboard for visualizing drone-based safety violations using React, Express, PostgreSQL, and Docker.

## 🚀 Features

- Upload JSON reports from drones
- KPI cards showing total violations & unique drones
- Pie chart by violation type (interactive %)
- Time series chart of violations over time
- Leaflet Map of violations by coordinates
- Tabular list with ID, timestamp, GPS, type
- Responsive UI styled like Datadog

## 🧰 Tech Stack

- Frontend: React.js + Chart.js + Leaflet
- Backend: Node.js (Express)
- Database: PostgreSQL
- State Management: React Hooks
- Deployment: Docker & Docker Compose

## 🐳 Docker Setup

1. Clone the repo
```bash
git clone https://github.com/spillproof98/dataking-drone-analytics1.git
cd dataking-drone-analytics
```

2. Run the app
```bash
docker-compose up --build
```

3. Open the frontend at `http://localhost:3000`

## 📥 Uploading Drone Report

Upload a `.json` file (like below) from the dashboard UI:

```json
{
  "drone_id": "DRONE_X100",
  "date": "2025-07-10",
  "location": "Chennai",
  "violations": [
    {
      "id": "v001",
      "type": "Unauthorized Person",
      "timestamp": "2025-07-10T10:15:00Z",
      "latitude": 13.0827,
      "longitude": 80.2707,
      "image_url": "https://via.placeholder.com/150"
    },
    {
      "id": "v002",
      "type": "Fire Detected",
      "timestamp": "2025-07-10T11:00:00Z",
      "latitude": 13.0828,
      "longitude": 80.2708,
      "image_url": "https://via.placeholder.com/150"
    }
  ]
}
```

Sample: [`sample.json`](./sample.json)

## 📸 Screenshots

> Include screenshots of:  
> - KPI cards  
> - Pie chart with %  
> - Violation map  
> - Table

## 📁 Project Structure

```
backend/
frontend/
docker-compose.yml
sample.json
README.md
```

## 🧪 Local Testing

- Clear all data using:
```bash
docker exec -it dataking_db psql -U postgres -c "DELETE FROM violations;"
```

## 📅 Submission
- Googledrive: [https://drive.google.com/file/d/12DHFFTimQ4_0mKoJBHauyrjP-dYhEaF6/view?usp=drive_link]

- GitHub Repo: [https://github.com/spillproof98/dataking-drone-analytics1](https://github.com/spillproof98/dataking-drone-analytics1)

---


