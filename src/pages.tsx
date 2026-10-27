import { useMemo, useState } from "react";
import type { FormEvent, ReactNode } from "react";
import { Helmet } from "react-helmet-async";
import {
  ArrowDown,
  ArrowLeft,
  ArrowRight,
  ArrowUpRight,
  Bookmark,
  Check,
  Clock3,
  ExternalLink,
  Mail,
  Share2,
  Sparkles,
} from "lucide-react";
import { Link, useNavigate, useParams, useSearchParams } from "react-router-dom";
import { CategoryShortcuts, CategoryTiles, FeaturedStory, Newsletter, SearchResultsEmpty, SectionTitle, StoryCard } from "./components";
import { categories, slugify } from "./data";
import type { Story } from "./data";
import { saveMessage } from "./storage";

type PageProps = {
  stories: Story[];
  savedIds: string[];
  onBookmark: (id: string) => void;
  liveEnabled: boolean;
  liveLoading: boolean;
  liveError: string | null;
  onRefresh: () => void;
};

function PageMeta({ title, description }: { title: string; description: string }) {
  return <Helmet><title>{title} — Signal & Next</title><meta name="description" content={description} /><meta property="og:title" content={`${title} — Signal & Next`} /><meta property="og:description" content={description} /></Helmet>;
}

function SourceNote({ liveEnabled, liveLoading, liveError }: Pick<PageProps, "liveEnabled" | "liveLoading" | "liveError">) {
  if (!liveEnabled) return <div className="source-note"><Sparkles size={15} /><span><strong>EDITORIAL DEMO</strong> These are AI-generated sample stories — not live news.</span><Link to="/about">How this works <ArrowRight size={13} /></Link></div>;
  if (liveLoading) return <div className="source-note"><span className="loading-dot" /><span>Fetching articles from the configured GNews source…</span></div>;
  if (liveError) return <div className="source-note source-note-error"><span><strong>NEWS SOURCE UNAVAILABLE</strong> {liveError}</span><Link to="/about">About this demo <ArrowRight size={13} /></Link></div>;
  return <div className="source-note"><span className="live-dot" /><span><strong>EXTERNAL NEWS + EDITORIAL DEMO</strong> GNews headlines link to publishers; other stories are marked AI-generated samples.</span></div>;
}

export function HomePage({ stories, savedIds, onBookmark, liveEnabled, liveLoading, liveError }: PageProps) {
  const featured = stories.find((story) => story.source) ?? stories[0];
  const recent = stories.filter((story) => story.id !== featured?.id).slice(0, 3);
  return (
    <>
      <PageMeta title="Technology, thoughtfully." description="A thoughtful field guide to the ideas, people, and technology shaping what comes next." />
      <section className="hero-intro">
        <div className="hero-kicker"><span className="live-dot" /> INDEPENDENT TECHNOLOGY JOURNAL <span className="hero-kicker-date">VOL. 01 &nbsp;·&nbsp; NO. 08</span></div>
        <h1>For a world that's <span>always becoming.</span></h1>
        <p>Thoughtful stories about the technology shaping how we live, work, and imagine what's next.</p>
        <Link className="hero-scroll" to="/latest">SCROLL TO EXPLORE <ArrowDown size={14} /></Link>
        <div className="hero-index" aria-hidden="true">01 / 04</div>
      </section>
      <main className="page-main">
        <SourceNote liveEnabled={liveEnabled} liveLoading={liveLoading} liveError={liveError} />
        {featured && (
          <section className="feature-section">
            <FeaturedStory story={featured} saved={savedIds.includes(featured.id)} onBookmark={onBookmark} />
          </section>
        )}
        <section className="content-section latest-preview">
          <SectionTitle eyebrow="THE LATEST" title="Fresh perspectives." link="All stories" to="/latest" />
          <div className="story-grid story-grid-3">
            {recent.map((story, index) => <StoryCard key={story.id} story={story} index={index} saved={savedIds.includes(story.id)} onBookmark={onBookmark} />)}
          </div>
        </section>
        <section className="content-section topics-section">
          <SectionTitle eyebrow="FOLLOW YOUR CURIOSITY" title="A few things we're thinking about." link="Explore every topic" to="/categories" />
          <CategoryTiles />
        </section>
        <section className="manifesto-band">
          <div className="manifesto-mark">“</div>
          <div><p>We believe the future deserves more than hot takes.</p><span>GOOD QUESTIONS. CAREFUL REPORTING. A LITTLE ROOM TO THINK.</span></div>
          <ArrowUpRight size={22} />
        </section>
        <section className="content-section trending-preview">
          <SectionTitle eyebrow="MAKING WAVES" title="The stories finding their people." link="See what's trending" to="/trending" />
          <div className="story-grid story-grid-3">
            {stories.filter((story) => story.trending && story.id !== featured?.id).slice(0, 3).map((story, index) => <StoryCard key={story.id} story={story} index={index} saved={savedIds.includes(story.id)} onBookmark={onBookmark} />)}
          </div>
        </section>
        <div id="newsletter" className="newsletter-anchor"><Newsletter /></div>
      </main>
    </>
  );
}

function PageHeading({ eyebrow, title, description }: { eyebrow: string; title: ReactNode; description?: string }) {
  return <div className="page-heading"><span className="eyebrow"><span className="eyebrow-line" /> {eyebrow}</span><h1>{title}</h1>{description && <p>{description}</p>}</div>;
}

function StoryGridPage({ title, eyebrow, description, items, savedIds, onBookmark, liveEnabled, liveLoading, liveError, onRefresh, refreshable = false }: Omit<PageProps, "stories"> & {
  title: string;
  eyebrow: string;
  description: string;
  items: Story[];
  refreshable?: boolean;
}) {
  const [page, setPage] = useState(1);
  const pageSize = 6;
  const pageCount = Math.max(1, Math.ceil(items.length / pageSize));
  const currentPage = Math.min(page, pageCount);
  const visible = items.slice((currentPage - 1) * pageSize, currentPage * pageSize);
  return (
    <>
      <PageMeta title={title} description={description} />
      <main className="page-main listing-page">
        <SourceNote liveEnabled={liveEnabled} liveLoading={liveLoading} liveError={liveError} />
        <PageHeading eyebrow={eyebrow} title={title} description={description} />
        <div className="listing-toolbar"><span>{items.length} {items.length === 1 ? "story" : "stories"} <i /> {liveEnabled ? "Headlines from your selected source" : "Editorial demo collection"}</span>{refreshable && liveEnabled && <button className="text-link refresh-button" onClick={onRefresh} disabled={liveLoading}>{liveLoading ? "Refreshing…" : <><Sparkles size={15} /> Refresh headlines</>}</button>}</div>
        <div className="story-grid story-grid-3">
          {visible.map((story, index) => <StoryCard key={story.id} story={story} index={index} saved={savedIds.includes(story.id)} onBookmark={onBookmark} />)}
        </div>
        {items.length === 0 && <SearchResultsEmpty />}
        {pageCount > 1 && <nav className="pagination" aria-label="Story pagination">
          <button disabled={currentPage === 1} onClick={() => { setPage(currentPage - 1); window.scrollTo({ top: 0, behavior: "smooth" }); }}><ArrowLeft size={16} /> Previous</button>
          <div>{Array.from({ length: pageCount }, (_, index) => index + 1).map((pageNumber) => <button key={pageNumber} className={pageNumber === currentPage ? "current-page" : ""} aria-label={`Page ${pageNumber}`} aria-current={pageNumber === currentPage ? "page" : undefined} onClick={() => { setPage(pageNumber); window.scrollTo({ top: 0, behavior: "smooth" }); }}>{String(pageNumber).padStart(2, "0")}</button>)}</div>
          <button disabled={currentPage === pageCount} onClick={() => { setPage(currentPage + 1); window.scrollTo({ top: 0, behavior: "smooth" }); }}>Next <ArrowRight size={16} /></button>
        </nav>}
        <div className="listing-bottom"><span>CURATED FOR THE CURIOUS</span><span>{String(Math.min(currentPage * pageSize, items.length)).padStart(2, "0")} / {String(items.length).padStart(2, "0")} STORIES</span></div>
      </main>
    </>
  );
}

export function LatestPage(props: PageProps) {
  return <StoryGridPage {...props} title="The latest" eyebrow="WHAT'S NEW" description="New ideas, emerging technologies, and the people thinking about what comes next." items={props.stories} refreshable />;
}

export function TrendingPage(props: PageProps) {
  const trending = props.stories.filter((story) => story.trending);
  return <StoryGridPage {...props} title="On everyone's mind." eyebrow="THE CONVERSATION" description="Stories our readers are sharing, saving, and thinking about today." items={trending} />;
}

export function CategoriesPage() {
  return (
    <>
      <PageMeta title="Explore topics" description="Explore thoughtful coverage across artificial intelligence, the internet, climate, robotics, and design." />
      <main className="page-main listing-page">
        <PageHeading eyebrow="GO WHERE CURIOSITY TAKES YOU" title={<>Follow a thread.<br /><span>Find a new one.</span></>} description="Thoughtful reporting across the ideas, people, and technologies changing our world." />
        <div className="category-explore-grid">{categories.map((category, index) => (
          <Link className="category-explore-card" to={`/category/${slugify(category.name)}`} key={category.name}>
            <span className="category-large-icon">{category.icon}</span><span className="category-number">0{index + 1}</span><h2>{category.name}</h2><p>{category.count} stories exploring the questions behind {category.short.toLowerCase()}.</p><span className="text-link">Explore this topic <ArrowRight size={16} /></span>
          </Link>
        ))}</div>
      </main>
    </>
  );
}

export function CategoryPage({ stories, savedIds, onBookmark, liveEnabled, liveLoading, liveError }: PageProps) {
  const { category: categorySlug = "" } = useParams();
  const category = categories.find((item) => slugify(item.name) === categorySlug);
  const items = category ? stories.filter((story) => story.category === category.name) : [];
  return (
    <StoryGridPage
      title={category?.name ?? "Topic not found"}
      eyebrow="EXPLORE A TOPIC"
      description={category ? `Careful reporting and fresh perspectives on ${category.name.toLowerCase()}.` : "We couldn't find that topic. Try exploring one of our other sections."}
      items={items}
      savedIds={savedIds}
      onBookmark={onBookmark}
      liveEnabled={liveEnabled}
      liveLoading={liveLoading}
      liveError={liveError}
      onRefresh={() => undefined}
    />
  );
}

export function SearchPage({ stories, savedIds, onBookmark, liveEnabled, liveLoading, liveError }: PageProps) {
  const [params] = useSearchParams();
  const query = params.get("q")?.trim() ?? "";
  const results = useMemo(() => {
    const normalized = query.toLowerCase();
    if (!normalized) return [];
    return stories.filter((story) => [story.title, story.excerpt, story.category, ...story.tags].join(" ").toLowerCase().includes(normalized));
  }, [query, stories]);
  return (
    <>
      <PageMeta title={query ? `Search: ${query}` : "Search"} description={query ? `Search results for ${query} on Signal & Next.` : "Search thoughtful technology stories on Signal & Next."} />
      <main className="page-main listing-page">
        <SourceNote liveEnabled={liveEnabled} liveLoading={liveLoading} liveError={liveError} />
        <PageHeading eyebrow="FIND YOUR NEXT READ" title={<>Curiosity, <span>meet search.</span></>} description={query ? `${results.length} ${results.length === 1 ? "story" : "stories"} for “${query}”.` : "Use the search button above to look for an idea, topic, or story."} />
        {!query ? <SearchResultsEmpty /> : results.length ? <div className="story-grid story-grid-3">{results.map((story, index) => <StoryCard key={story.id} story={story} index={index} saved={savedIds.includes(story.id)} onBookmark={onBookmark} />)}</div> : <SearchResultsEmpty query={query} />}
      </main>
    </>
  );
}

export function SavedPage({ stories, savedIds, onBookmark }: Pick<PageProps, "stories" | "savedIds" | "onBookmark">) {
  const savedStories = stories.filter((story) => savedIds.includes(story.id));
  return (
    <>
      <PageMeta title="Your saved stories" description="Your personal reading list of saved stories." />
      <main className="page-main listing-page">
        <PageHeading eyebrow="YOUR READING LIST" title={<>Keep the good <span>ones close.</span></>} description={`${savedStories.length} ${savedStories.length === 1 ? "story" : "stories"} saved for whenever you're ready.`} />
        {savedStories.length ? <div className="story-grid story-grid-3">{savedStories.map((story, index) => <StoryCard key={story.id} story={story} index={index} saved onBookmark={onBookmark} />)}</div> : <SearchResultsEmpty />}
      </main>
    </>
  );
}

export function ArticlePage({ stories, savedIds, onBookmark }: Pick<PageProps, "stories" | "savedIds" | "onBookmark">) {
  const { slug = "" } = useParams();
  const story = stories.find((item) => slugify(item.title) === slug);
  const [shareStatus, setShareStatus] = useState("");
  const saved = story ? savedIds.includes(story.id) : false;
  async function shareStory() {
    if (!story) return;
    try {
      if (navigator.share) await navigator.share({ title: story.title, text: story.excerpt, url: window.location.href });
      else {
        await navigator.clipboard.writeText(window.location.href);
        setShareStatus("Link copied");
      }
    } catch (error) {
      if (error instanceof Error && error.name !== "AbortError") {
        setShareStatus("Could not share this link");
        console.error("Could not share article.", error);
      }
    }
  }
  if (!story) return <><PageMeta title="Story not found" description="This story could not be found." /><main className="page-main listing-page"><SearchResultsEmpty /></main></>;
  const related = stories.filter((item) => item.category === story.category && item.id !== story.id).slice(0, 3);
  return (
    <>
      <PageMeta title={story.title} description={story.excerpt} />
      <main className="article-page">
        <div className="article-back"><Link to="/latest"><ArrowLeft size={15} /> All stories</Link><CategoryShortcuts /></div>
        <article>
          <header className="article-header">
            <span className="category-label">{story.category}</span>
            <h1>{story.title}</h1>
            <p className="article-deck">{story.excerpt}</p>
            <div className="article-byline">
              <span className="avatar">{story.author.split(" ").map((part) => part[0]).join("").slice(0, 2)}</span>
              <span><strong>{story.author}</strong><small>{story.date} <i /> {story.readTime}</small></span>
              <div className="article-actions">
                <button className={`article-action ${saved ? "is-saved" : ""}`} onClick={() => onBookmark(story.id)} aria-pressed={saved}><Bookmark size={16} fill={saved ? "currentColor" : "none"} /> <span>{saved ? "Saved" : "Save"}</span></button>
                <button className="article-action" onClick={shareStory}><Share2 size={16} /><span>Share</span></button>
              </div>
            </div>
            <span className="share-feedback" aria-live="polite">{shareStatus}</span>
          </header>
          <figure className="article-cover"><img src={story.image} alt={story.imageAlt} /><figcaption>{story.source ? `Image and headline via ${story.source}. Read the full story at the publisher.` : "An editorial illustration for this AI-generated sample story."}</figcaption></figure>
          <div className="article-body">
            {!story.source && <div className="article-sample-notice"><Sparkles size={16} /><span>This is an AI-generated sample article created to demonstrate the publication. It is not live reporting.</span></div>}
            <div className="article-reading-info"><Clock3 size={15} /> {story.readTime} <span>·</span> A thoughtful read from Signal & Next</div>
            {story.content.map((paragraph, index) => <p key={`${story.id}-${index}`} className={index === 0 ? "article-lede" : ""}>{paragraph}</p>)}
            {story.url && <a className="publisher-link" href={story.url} target="_blank" rel="noreferrer">Read the full story at {story.source ?? "the publisher"} <ExternalLink size={16} /></a>}
            <div className="article-tags"><span>IN THIS STORY</span>{story.tags.map((tag) => <Link key={tag} to={`/search?q=${encodeURIComponent(tag)}`}>#{tag.replace(/\s+/g, "")}</Link>)}</div>
            <div className="article-endmark">s<span>.</span></div>
          </div>
        </article>
        <section className="article-related">
          <SectionTitle eyebrow="KEEP FOLLOWING THE THREAD" title="A little more signal." link="Explore all stories" to="/latest" />
          {related.length ? <div className="story-grid story-grid-3">{related.map((item, index) => <StoryCard key={item.id} story={item} index={index} saved={savedIds.includes(item.id)} onBookmark={onBookmark} />)}</div> : <div className="related-empty"><p>More stories are on their way.</p><Link className="text-link" to="/categories">Explore every topic <ArrowRight size={15} /></Link></div>}
        </section>
      </main>
    </>
  );
}

export function AboutPage() {
  return (
    <>
      <PageMeta title="About" description="Signal & Next is an independent technology journal for people who want to think a little deeper about what comes next." />
      <main className="page-main about-page">
        <PageHeading eyebrow="A SMALL NOTE ABOUT US" title={<>Technology,<br /><span>with the volume turned down.</span></>} description="Signal & Next is an independent journal for people who want to think a little deeper about what's coming." />
        <div className="about-image"><img src="https://images.unsplash.com/photo-1497366754035-f200968a6e72?auto=format&fit=crop&w=1800&q=85" alt="Sunlit creative studio with a shared work table" /><span>AN OPEN SPACE FOR GOOD QUESTIONS</span></div>
        <div className="about-content">
          <div className="about-side-note"><span className="eyebrow">OUR POINT OF VIEW</span><span>THE FUTURE IS A<br />SHARED PROJECT.</span></div>
          <div className="about-copy"><h2>There is no shortage of news.<br /><span>There is a shortage of perspective.</span></h2><p>New technology arrives with a lot of noise: breathless predictions, overnight revolutions, and the feeling that you should already know everything. We started Signal & Next to make room for a different kind of conversation.</p><p>Here, we follow the people and ideas shaping technology's next chapter. We care about what works, what needs a closer look, and what it all means for the lives we actually live.</p><p>Signal & Next is an independent editorial demo. The stories currently on the site are clearly marked AI-generated samples, not journalism or breaking news. Add a GNews API key to connect a real news feed—with publishers always credited and linked.</p></div>
        </div>
        <div className="values-grid"><div><span>01</span><h3>Curiosity, first.</h3><p>Good questions are more useful than easy certainty.</p></div><div><span>02</span><h3>People in the picture.</h3><p>Technology is made by people, and it changes people's lives.</p></div><div><span>03</span><h3>Optimism with its eyes open.</h3><p>Progress is possible when we are honest about the tradeoffs.</p></div></div>
        <div className="about-cta"><div><span className="eyebrow">BE PART OF THE CONVERSATION</span><h2>Have a good question?<br /><span>We'd love to hear it.</span></h2></div><Link className="button-primary" to="/contact">Say hello <ArrowUpRight size={16} /></Link></div>
      </main>
    </>
  );
}

export function ContactPage() {
  const [submitted, setSubmitted] = useState(false);
  const [error, setError] = useState("");
  function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const form = new FormData(event.currentTarget);
    const name = String(form.get("name") ?? "").trim();
    const email = String(form.get("email") ?? "").trim();
    const message = String(form.get("message") ?? "").trim();
    if (!name || !email || !message) {
      setError("Please fill in every field before sending.");
      return;
    }
    saveMessage(JSON.stringify({ name, email, message, submittedAt: new Date().toISOString() }));
    setSubmitted(true);
    setError("");
    event.currentTarget.reset();
  }
  return (
    <>
      <PageMeta title="Get in touch" description="Get in touch with the Signal & Next editorial team." />
      <main className="page-main contact-page">
        <div className="contact-heading"><PageHeading eyebrow="A HUMAN ON THE OTHER END" title={<>Have a thought?<br /><span>We're listening.</span></>} description="A story idea, a kind note, a question that's been on your mind — our inbox is open." /><div className="contact-aside"><span className="contact-aside-mark">↘</span><span>GOOD CONVERSATIONS<br />START SOMEWHERE.</span><a href="mailto:hello@signalnext.example"><Mail size={15} /> hello@signalnext.example</a></div></div>
        <div className="contact-layout">
          <div className="contact-form-side"><span className="eyebrow">DROP US A LINE</span><h2>Let's start<br />a conversation.</h2>{submitted ? <div className="form-success" role="status"><span><Check size={18} /></span><div><strong>Message saved. Thank you.</strong><p>This demo stores messages only in this browser. Connect a backend to deliver messages to your inbox.</p></div></div> : <form className="contact-form" onSubmit={handleSubmit}>
            <label htmlFor="contact-name">Your name</label><input id="contact-name" name="name" autoComplete="name" placeholder="How should we call you?" required />
            <label htmlFor="contact-email">Email address</label><input id="contact-email" name="email" type="email" autoComplete="email" placeholder="Where can we write back?" required />
            <label htmlFor="contact-message">What's on your mind?</label><textarea id="contact-message" name="message" rows={5} placeholder="Take your time. We're reading." required />
            <p className="form-error" aria-live="polite">{error}</p><button className="button-primary" type="submit">Send your note <ArrowRight size={16} /></button>
          </form>}</div>
          <aside className="contact-sidebar"><div className="sidebar-card"><span className="eyebrow">THE SUNDAY LETTER</span><h3>A little signal,<br />once a week.</h3><p>Our favorite ideas, thoughtful reads, and questions to take into next week.</p><Link to="/#newsletter" className="text-link">Find your next note <ArrowRight size={15} /></Link></div><div className="sidebar-card sidebar-card-secondary"><span className="eyebrow">FIND YOUR THREAD</span><h3>Explore the things<br />we're thinking about.</h3><CategoryShortcuts /></div><div className="sidebar-footnote"><span><Clock3 size={14} /> A REAL HUMAN REPLIES</span><p>We're a small team, but we read every note. Please allow a couple of weekdays for a reply.</p></div></aside>
        </div>
      </main>
    </>
  );
}

export function NotFoundPage() {
  const navigate = useNavigate();
  return <main className="page-main not-found"><PageMeta title="Page not found" description="That page could not be found." /><span className="eyebrow">404 · LOST IN THE SIGNAL</span><h1>This page took<br /><span>a little detour.</span></h1><p>Nothing to worry about. Let's get you back to something interesting.</p><button className="button-primary" onClick={() => navigate("/")}>Back to the beginning <ArrowRight size={16} /></button></main>;
}
