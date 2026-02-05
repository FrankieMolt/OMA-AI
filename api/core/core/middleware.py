# Main OMA-AI Dashboard
# Deployed: 2026-02-03
# Stack: Next.js + FastAPI + SQLite + x402

from fastapi import Request
from fastapi.responses import JSONResponse
import logging

logger = logging.getLogger('oma-ai.middleware')

async def error_handling_middleware(request: Request, call_next):
    try:
        return await call_next(request)
    except Exception as exc:
        logger.error(f"Unhandled error: {str(exc)}", exc_info=True)
        return JSONResponse(
            status_code=500,
            content={
                "error": "Internal Server Error",
                "message": str(exc),
                "path": request.url.path
            }
        )
