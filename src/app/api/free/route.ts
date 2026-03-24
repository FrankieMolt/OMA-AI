import { NextResponse } from "next/server";

const jokes = [
  { setup: "Why do programmers prefer dark mode?", punchline: "Because light attracts bugs." },
  { setup: "Why did the developer go broke?", punchline: "Because he used up all his cache." },
  { setup: "What's a programmer's favorite hangout place?", punchline: "Foo Bar." },
  { setup: "Why do Java developers wear glasses?", punchline: "Because they can't C#." },
  { setup: "How many programmers does it take to change a light bulb?", punchline: "None. That's a hardware problem." },
  { setup: "What's the object-oriented way to become wealthy?", punchline: "Inheritance." },
  { setup: "Why was the JavaScript developer sad?", punchline: "Because he didn't Node how to Express himself." },
  { setup: "What's a computer's least favorite food?", punchline: "Spam." },
];

const quotes = [
  { text: "The best way to predict the future is to invent it.", author: "Alan Kay" },
  { text: "Code is like humor. When you have to explain it, it's bad.", author: "Cory House" },
  { text: "First, solve the problem. Then, write the code.", author: "John Johnson" },
  { text: "Any fool can write code that a computer can understand. Good programmers write code that humans can understand.", author: "Martin Fowler" },
  { text: "Experience is the name everyone gives to their mistakes.", author: "Oscar Wilde" },
  { text: "The only way to learn a new programming language is by writing programs in it.", author: "Dennis Ritchie" },
  { text: "Simplicity is the soul of efficiency.", author: "Austin Freeman" },
  { text: "Make it work, make it right, make it fast.", author: "Kent Beck" },
];

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const type = searchParams.get("type") || "all";

  const joke = jokes[Math.floor(Math.random() * jokes.length)];
  const quote = quotes[Math.floor(Math.random() * quotes.length)];

  if (type === "joke") {
    return NextResponse.json({ 
      success: true, 
      data: { joke, timestamp: new Date().toISOString() },
      note: "This API is for testing purposes only"
    });
  }
  
  if (type === "quote") {
    return NextResponse.json({ 
      success: true, 
      data: { quote, timestamp: new Date().toISOString() },
      note: "This API is for testing purposes only"
    });
  }

  return NextResponse.json({ 
    success: true, 
    data: { joke, quote, timestamp: new Date().toISOString() },
    note: "This API is for testing purposes only"
  });
}
