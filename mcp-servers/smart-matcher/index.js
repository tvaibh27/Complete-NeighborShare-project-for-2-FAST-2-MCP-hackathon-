#!/usr/bin/env node

import { Server } from "@modelcontextprotocol/sdk/server/index.js";
import { StdioServerTransport } from "@modelcontextprotocol/sdk/server/stdio.js";
import { CallToolRequestSchema, ListToolsRequestSchema } from "@modelcontextprotocol/sdk/types.js";

const server = new Server(
  {
    name: "neighborshare-smart-matcher",
    version: "1.0.0",
  },
  {
    capabilities: {
      tools: {},
    },
  }
);

// List available tools
server.setRequestHandler(ListToolsRequestSchema, async () => {
  return {
    tools: [
      {
        name: "find_matches",
        description: "Find matching HAVE posts for a NEED request",
        inputSchema: {
          type: "object",
          properties: {
            need_item: { type: "string", description: "Item needed" },
            urgent: { type: "boolean", description: "Is urgent?" },
            available_items: {
              type: "array",
              items: {
                type: "object",
                properties: {
                  item: { type: "string" },
                  distance_km: { type: "number" },
                  owner: { type: "string" }
                }
              }
            }
          },
          required: ["need_item", "available_items"]
        }
      }
    ]
  };
});

// Handle tool calls
server.setRequestHandler(CallToolRequestSchema, async (request) => {
  if (request.params.name === "find_matches") {
    const { need_item, available_items, urgent } = request.params.arguments;
    
    const matches = available_items
      .filter(item => item.item.toLowerCase().includes(need_item.toLowerCase()))
      .sort((a, b) => a.distance_km - b.distance_km)
      .slice(0, 3);
    
    return {
      content: [{
        type: "text",
        text: JSON.stringify({
          matches,
          total: matches.length,
          message: urgent ? `🚨 URGENT: Found ${matches.length} matches!` : `Found ${matches.length} matches`
        }, null, 2)
      }]
    };
  }
  
  throw new Error(`Unknown tool: ${request.params.name}`);
});

// Start server
async function main() {
  const transport = new StdioServerTransport();
  await server.connect(transport);
  console.error("✓ Smart Matcher MCP Ready");
}

main().catch(console.error);