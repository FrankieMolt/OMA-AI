import { NextResponse } from "next/server";

const jokes = [
  { setup: "Why do programmers prefer dark mode?", punchline: "Because light attracts bugs." },
  { setup: "Why did the developer go broke?", punchline: "Because he used up all his cache." },
  { setup: "What's a programmer's favorite hangout place?", punchline: "Foo Bar." },
  { setup: "Why do Java developers wear glasses?", punchline: "Because they can't C#." },
  { setup: "How many programmers does it take to change a light bulb?", punchline: "None. That's a hardware problem." },
  { setup: "What's the object-oriented way to become wealthy?", punchline: "Inheritance." },
  { setup: "Why was the JavaScript developer sad?", punchline: "Because he didn't Node how to Express himself." },
];

export async function GET() {
  const joke = jokes[Math.floor(Math.random() * jokes.length)];
  return NextResponse.json({ joke, timestamp: new Date().toISOString() });
}
