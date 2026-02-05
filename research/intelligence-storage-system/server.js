const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const db = require('./db');

const app = express();
const PORT = 3001; // Running on 3001 to avoid conflict with ultimate-ecosystem on 3000

app.use(cors());
app.use(bodyParser.json());

// --- ROUTES ---

// Ingest Content (#secondbrain)
app.post('/api/ingest', (req, res) => {
    const { url, text, tags, category } = req.body;
    
    // Simple "AI" processing simulation
    const summary = text.substring(0, 100) + "...";
    const insights = "Detected opportunity in " + (tags || "general market");

    const stmt = db.prepare(`INSERT INTO content (source_url, content_text, tags, category, summary, insights, processed) VALUES (?, ?, ?, ?, ?, ?, 1)`);
    
    stmt.run(url, text, tags, category || 'uncategorized', summary, insights, function(err) {
        if (err) {
            return res.status(500).json({ error: err.message });
        }
        res.json({ id: this.lastID, status: "ingested", insights: insights });
    });
    stmt.finalize();
});

// Search
app.get('/api/search', (req, res) => {
    const query = req.query.q;
    if (!query) return res.status(400).json({ error: "Missing query" });

    db.all(`SELECT * FROM content_fts WHERE content_fts MATCH ? ORDER BY rank LIMIT 20`, [query], (err, rows) => {
        if (err) return res.status(500).json({ error: err.message });
        res.json(rows);
    });
});

// Get Latest Insights (Premium/Public mix)
app.get('/api/insights', (req, res) => {
    db.all(`SELECT id, category, summary, created_at FROM content ORDER BY created_at DESC LIMIT 10`, [], (err, rows) => {
        if (err) return res.status(500).json({ error: err.message });
        res.json(rows);
    });
});

// Stats
app.get('/api/stats', (req, res) => {
    db.get(`SELECT COUNT(*) as count FROM content`, [], (err, row) => {
        if (err) return res.status(500).json({ error: err.message });
        res.json(row);
    });
});

app.listen(PORT, () => {
    console.log(`🧠 Intelligence System running on port ${PORT}`);
});
