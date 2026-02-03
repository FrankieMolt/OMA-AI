from setuptools import setup, find_packages

setup(
    name="oma-sdk",
    version="1.0.0",
    description="OpenMarketAccess SDK - Official Python SDK for interacting with OMA platform",
    author="OpenMarketAccess",
    license="MIT",
    packages=find_packages(),
    install_requires=[
        "requests>=2.31.0",
        "pydantic>=2.5.0",
        "websockets>=12.0",
        "aiohttp>=3.9.0",
    ],
    extras_require={
        "solana": ["solana>=0.31.0"],
        "dev": ["pytest>=7.4.0", "pytest-asyncio>=0.21.0", "black>=23.0.0"],
    },
    python_requires=">=3.8",
    classifiers=[
        "Development Status :: 4 - Beta",
        "Intended Audience :: Developers",
        "License :: OSI Approved :: MIT License",
        "Programming Language :: Python :: 3",
        "Programming Language :: Python :: 3.8",
        "Programming Language :: Python :: 3.9",
        "Programming Language :: Python :: 3.10",
        "Programming Language :: Python :: 3.11",
    ],
)
