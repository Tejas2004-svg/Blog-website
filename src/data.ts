export type Story = {
  id: string;
  title: string;
  excerpt: string;
  category: string;
  author: string;
  date: string;
  readTime: string;
  image: string;
  imageAlt: string;
  featured?: boolean;
  trending?: boolean;
  source?: string;
  url?: string;
  content: string[];
  tags: string[];
};

const image = (id: string) =>
  `https://images.unsplash.com/${id}?auto=format&fit=crop&w=1400&q=85`;

export const stories: Story[] = [
  {
    id: "the-next-interface-might-be-no-interface",
    title: "The next interface might be no interface at all",
    excerpt:
      "As AI agents move from answering questions to taking action, the most important design decision may be what users never have to click.",
    category: "Artificial intelligence",
    author: "Maya Chen",
    date: "October 24, 2025",
    readTime: "8 min read",
    image: image("photo-1518770660439-4636190af475"),
    imageAlt: "Glowing circuit board details against a dark background",
    featured: true,
    trending: true,
    content: [
      "For decades, software taught us to meet it halfway. We learned its menus, memorized its shortcuts, and translated our intentions into the language of buttons and screens. That bargain is beginning to change.",
      "A new generation of AI tools is designed to work in the background: sorting what matters, connecting the dots between apps, and suggesting a next step before anyone thinks to ask. Instead of asking us to navigate a maze, the best tools may simply make the maze disappear.",
      "There is a catch. A quieter interface is not automatically a more trustworthy one. When software acts on our behalf, it needs to make its reasoning legible, give people a way to interrupt, and make the undo button feel like a first-class feature.",
      "The real design challenge is not building an agent that can do everything. It is building one that knows when not to. In the years ahead, the most elegant interface may be the one that earns the right to stay out of sight.",
    ],
    tags: ["AI", "Design", "Future of work"],
  },
  {
    id: "small-models-are-having-a-big-moment",
    title: "Small models are having a very big moment",
    excerpt:
      "Powerful AI is no longer limited to the cloud. A new wave of compact models is making on-device intelligence faster, more private, and surprisingly capable.",
    category: "Artificial intelligence",
    author: "Jonah Park",
    date: "October 22, 2025",
    readTime: "6 min read",
    image: image("photo-1519389950473-47ba0277781c"),
    imageAlt: "Creative team collaborating around a laptop",
    trending: true,
    content: [
      "The biggest AI headlines tend to focus on bigger: larger training runs, larger clusters, larger ambitions. But some of the most useful progress is happening in the opposite direction.",
      "Compact models can run directly on a laptop or phone. That changes the equation for latency, cost, and privacy. A voice assistant that never needs to send a personal note to a distant server is a fundamentally different product from one that does.",
      "Of course, smaller systems have real limits. They may be less reliable on complex tasks and can struggle with specialized knowledge. The interesting work is not pretending those constraints are gone; it is matching a right-sized model to a clearly defined job.",
    ],
    tags: ["AI", "On-device", "Privacy"],
  },
  {
    id: "the-new-energy-story-behind-ai",
    title: "The new energy story behind the AI boom",
    excerpt:
      "Every useful answer from a data center has a physical footprint. The next chapter of AI may be written as much by grid operators as by software labs.",
    category: "Climate & energy",
    author: "Elena Ruiz",
    date: "October 20, 2025",
    readTime: "7 min read",
    image: image("photo-1473341304170-971dccb5ac1e"),
    imageAlt: "Wind turbines generating energy across green hills",
    trending: true,
    content: [
      "AI is often described as something that lives in the cloud. The metaphor is tidy, but the infrastructure is anything but weightless: servers need land, water, and reliable power around the clock.",
      "That demand is arriving at a moment when electricity grids are also trying to decarbonize. New data centers can accelerate investment in transmission and storage, but they can also strain local systems if new capacity is not planned carefully.",
      "The most promising projects are treating energy as a design constraint from day one. Flexible workloads, better cooling, and locations with abundant clean power all matter. So does transparency: communities deserve a clear picture of what is being built near them.",
    ],
    tags: ["Energy", "Climate", "Infrastructure"],
  },
  {
    id: "who-gets-to-build-the-next-internet",
    title: "Who gets to build the next internet?",
    excerpt:
      "The future of an open web depends on decisions being made now about access, infrastructure, and who gets to set the rules.",
    category: "The internet",
    author: "Theo Morgan",
    date: "October 18, 2025",
    readTime: "9 min read",
    image: image("photo-1451187580459-43490279c0fa"),
    imageAlt: "Planet Earth at night, seen from orbit",
    trending: false,
    content: [
      "The internet was built as a network of networks, a shared foundation that made room for an improbable variety of ideas. It was never perfect, but its open protocols let new services find an audience without asking permission first.",
      "Today, a smaller number of platforms control more of the paths we take online. The next generation of AI interfaces could concentrate that power further—or make the web feel personal and portable again.",
      "Open standards do not guarantee an open outcome. They do, however, give communities and independent builders something concrete to work with. Preserving that choice is a practical task, not just a nostalgic one.",
    ],
    tags: ["Internet", "Open web", "Society"],
  },
  {
    id: "a-more-human-approach-to-robotics",
    title: "A more human approach to teaching robots",
    excerpt:
      "What if the fastest way to teach a robot a new task was to let a person simply show it how?",
    category: "Robotics",
    author: "Ravi Nair",
    date: "October 16, 2025",
    readTime: "5 min read",
    image: image("photo-1485827404703-89b55fcc595e"),
    imageAlt: "Small service robot in a bright, minimal room",
    content: [
      "Traditional robots excel when a task is predictable and a factory floor is carefully arranged. The world outside that setting is full of small variations: a different shelf, an unfamiliar object, a person standing in the way.",
      "Researchers are exploring a more intuitive teaching method: show a robot what to do, then let it learn from demonstrations. This can make training feel less like programming and more like collaboration.",
      "There is still a long way to go from a successful lab demo to a robot that can be trusted in everyday life. Reliability, physical safety, and the ability to ask for help remain essential parts of the story.",
    ],
    tags: ["Robotics", "Research", "People"],
  },
  {
    id: "inside-the-quiet-revolution-in-personal-tech",
    title: "Inside the quiet revolution in personal tech",
    excerpt:
      "A new generation of gadgets is less interested in adding another screen and more interested in fitting into the rhythm of everyday life.",
    category: "Design & culture",
    author: "Amara Okafor",
    date: "October 14, 2025",
    readTime: "6 min read",
    image: image("photo-1512641406448-6574e777bec6"),
    imageAlt: "A person using a compact phone in soft afternoon light",
    content: [
      "For years, new technology meant more: more notifications, more apps, more time spent looking down at a glowing rectangle. A quieter wave of products is asking a different question: what if technology made space instead?",
      "That shift is showing up in thoughtful defaults, calmer software, and devices that do fewer things more intentionally. The promise is not a return to a pre-digital world, but a more deliberate relationship with the one we already have.",
      "The details matter. A focus mode is useful when it is easy to understand and easy to turn off. A wearable is helpful when it informs without constantly interrupting. Good personal technology should leave people feeling more present, not more managed.",
    ],
    tags: ["Design", "Wellbeing", "Culture"],
  },
  {
    id: "the-open-source-people-building-ai-in-public",
    title: "The people building AI in public",
    excerpt:
      "Meet the small research teams showing how open development can make emerging technology easier to examine and improve.",
    category: "Artificial intelligence",
    author: "Maya Chen",
    date: "October 12, 2025",
    readTime: "7 min read",
    image: image("photo-1521737711867-e3b97375f902"),
    imageAlt: "A small team sharing ideas at a sunlit studio table",
    content: [
      "A public research project is more than a model file. It is a record of what was tested, which tradeoffs were made, and where the rough edges remain.",
      "Across the open-source community, teams are publishing tools, datasets, and evaluations that help more people understand how AI systems behave. Their work makes it easier for independent researchers to ask better questions and for builders to adapt tools to local needs.",
      "Openness is not a cure-all. Responsible releases still require care around privacy and misuse. But when it is done thoughtfully, building in public can turn a closed technical conversation into something more accountable.",
    ],
    tags: ["Open source", "AI", "Community"],
  },
  {
    id: "why-the-next-big-idea-might-be-smaller",
    title: "Why the next big idea might be a smaller battery",
    excerpt:
      "Behind the excitement about electric transport is a less glamorous race to make batteries last longer, cost less, and use more abundant materials.",
    category: "Climate & energy",
    author: "Elena Ruiz",
    date: "October 9, 2025",
    readTime: "5 min read",
    image: image("photo-1593941707882-a5bba14938c7"),
    imageAlt: "Electric car charging in a modern city",
    content: [
      "The clean energy transition often gets told through sweeping milestones. But much of its progress comes from materials scientists and engineers improving technologies one practical detail at a time.",
      "Battery chemistry is a good example. A better battery is not simply one with the highest possible energy density; it may be one that uses more common materials, performs reliably in cold weather, and can be manufactured closer to where it is needed.",
      "There is no single chemistry that will solve every storage problem. A diverse mix of options—and the infrastructure to recycle them—may be the more useful breakthrough.",
    ],
    tags: ["Batteries", "Climate", "Transport"],
  },
  {
    id: "the-case-for-a-slower-internet",
    title: "The case for a slower, more thoughtful internet",
    excerpt:
      "A growing group of designers is rethinking the race for attention, making digital spaces that reward curiosity rather than speed.",
    category: "Design & culture",
    author: "Theo Morgan",
    date: "October 7, 2025",
    readTime: "4 min read",
    image: image("photo-1455390582262-044cdead277a"),
    imageAlt: "Open notebook and coffee on a quiet writing desk",
    content: [
      "The fastest version of the internet is not always the most satisfying. Infinite feeds and instant recommendations make it easy to find more of what we already know, and harder to stumble across something genuinely surprising.",
      "Independent makers are experimenting with websites that invite a longer visit: slower reading, smaller communities, and fewer interruptions. These spaces make a modest but useful claim—that attention can be designed for, not just captured.",
      "A thoughtful internet is not a feature anyone can ship overnight. It grows through choices by creators and readers alike, and the best place to start may be giving one good idea the time it deserves.",
    ],
    tags: ["Internet", "Design", "Ideas"],
  },
  {
    id: "can-we-make-data-centers-feel-local",
    title: "Can we make data centers feel a little more local?",
    excerpt:
      "A look at the communities finding ways to connect digital infrastructure with the places, people, and power systems around it.",
    category: "The internet",
    author: "Jonah Park",
    date: "October 4, 2025",
    readTime: "6 min read",
    image: image("photo-1486406146926-c627a92ad1ab"),
    imageAlt: "Modern architecture and glass buildings under a blue sky",
    content: [
      "Digital infrastructure can feel distant even when a data center is just beyond the edge of town. People often encounter the project through its power and water needs long before they see what it contributes.",
      "Some communities are asking for a more reciprocal relationship: training programs, useful heat reuse, and clear reporting about energy use. These ideas do not resolve every tension, but they can make a conversation more concrete.",
      "For infrastructure to earn public trust, neighbors need more than a press release. They need enough information to understand what is changing, how impacts will be measured, and who is accountable when plans fall short.",
    ],
    tags: ["Infrastructure", "Communities", "Technology"],
  },
];

export const categories = [
  { name: "Artificial intelligence", short: "AI & intelligence", icon: "✳", count: 18 },
  { name: "The internet", short: "The internet", icon: "◎", count: 12 },
  { name: "Climate & energy", short: "Climate & energy", icon: "↗", count: 9 },
  { name: "Robotics", short: "Robotics", icon: "⌘", count: 7 },
  { name: "Design & culture", short: "Design & culture", icon: "◌", count: 11 },
];

export const slugify = (value: string) =>
  value
    .toLowerCase()
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-|-$/g, "");

export async function fetchLiveStories(query = "artificial intelligence"): Promise<Story[]> {
  const key = import.meta.env.VITE_GNEWS_API_KEY;
  if (!key) return [];

  const response = await fetch(
    `https://gnews.io/api/v4/search?q=${encodeURIComponent(query)}&lang=en&max=10&apikey=${encodeURIComponent(key)}`,
  );
  if (!response.ok) {
    throw new Error(`News provider returned ${response.status}. Check the GNews API key and plan limits.`);
  }
  const payload: { articles?: Array<Record<string, unknown>> } = await response.json();
  return (payload.articles ?? []).map((item, index) => {
    const source = item.source as { name?: string } | undefined;
    const published = typeof item.publishedAt === "string" ? new Date(item.publishedAt) : new Date();
    const title = typeof item.title === "string" ? item.title : "Untitled article";
    const url = typeof item.url === "string" ? item.url : undefined;
    return {
      id: `live-${index}-${slugify(title)}`,
      title,
      excerpt: typeof item.description === "string" ? item.description : "Open the publisher's article to read more.",
      category: "Artificial intelligence",
      author: source?.name ?? "News source",
      date: Number.isNaN(published.getTime())
        ? "Recently published"
        : new Intl.DateTimeFormat("en", { month: "long", day: "numeric", year: "numeric" }).format(published),
      readTime: "External article",
      image: typeof item.image === "string" ? item.image : image("photo-1518770660439-4636190af475"),
      imageAlt: `News image for ${title}`,
      source: source?.name ?? "GNews",
      url,
      content: [
        typeof item.description === "string" ? item.description : "This article is available from its original publisher.",
        "This story is provided by an external news source. Follow the source link to read the full article.",
      ],
      tags: ["AI", "Live source"],
    } satisfies Story;
  });
}
