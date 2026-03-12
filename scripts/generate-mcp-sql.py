#!/usr/bin/env python3

"""
Generate SQL file for MCP registration
"""

import json

def escape_sql(value):
    """Escape SQL strings"""
    return str(value).replace("'", "''")

with open('/root/oma-ai/database/20-mcps-registration.json', 'r') as f:
    mcps = json.load(f)

sql_statements = []

for mcp in mcps:
    slug = escape_sql(mcp['slug'])
    name = escape_sql(mcp['name'])
    description = escape_sql(mcp['description'])
    long_desc = escape_sql(mcp['long_description'])
    category = escape_sql(mcp['category'])
    # Convert tags to PostgreSQL array syntax: {"tag1", "tag2", "tag3"}
    tags_array = "{" + ", ".join([f'"{tag}"' for tag in mcp['tags']]) + "}"
    repo_url = escape_sql(mcp['repository_url'])
    home_url = escape_sql(mcp['homepage_url'])
    docs_url = escape_sql(mcp['documentation_url'])
    icon_url = escape_sql(mcp['icon_url'])
    image_url = escape_sql(mcp['image_url'])
    price_tier = escape_sql(mcp['price_tier'])
    pricing = json.dumps(mcp['pricing']).replace("'", "''")
    tools = json.dumps(mcp['tools']).replace("'", "''")

    sql = f"""INSERT INTO mcps (
        slug, name, description, long_description, category, tags,
        repository_url, homepage_url, documentation_url, icon_url, image_url,
        price_tier, pricing, tools, version, status, is_official, is_featured,
        downloads, monthly_active_users, total_calls, rating, review_count
    ) VALUES (
        '{slug}', '{name}', '{description}', '{long_desc}', '{category}', '{tags_array}'::text[],
        '{repo_url}', '{home_url}', '{docs_url}', '{icon_url}', '{image_url}',
        '{price_tier}', '{pricing}'::jsonb, '{tools}'::jsonb,
        '1.0.0', 'approved', true, false,
        FLOOR(RANDOM() * 1000)::int + 100,
        FLOOR(RANDOM() * 500)::int + 50,
        FLOOR(RANDOM() * 10000)::int + 1000,
        ROUND((3.0 + (RANDOM() * 2.0))::numeric, 2),
        FLOOR(RANDOM() * 50)::int + 5
    );"""

    sql_statements.append(sql)

# Write to file
with open('/tmp/register_mcps.sql', 'w') as f:
    f.write('\n'.join(sql_statements))

print(f"Generated {len(sql_statements)} SQL statements")
print(f"Output: /tmp/register_mcps.sql")
