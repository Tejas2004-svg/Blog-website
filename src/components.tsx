import { motion } from "framer-motion";
import {
  ArrowDownRight,
  ArrowRight,
  Bookmark,
  Check,
  Menu,
  Moon,
  Search,
  Sun,
  X,
} from "lucide-react";
import { useState } from "react";
import type { FormEvent } from "react";
import { Link, NavLink, useNavigate } from "react-router-dom";
import { categories, slugify } from "./data";
import type { Story } from "./data";
import { subscribe } from "./storage";

type HeaderProps = {
  theme: "dark" | "light";
  onToggleTheme: () => void;
};

export function Header({ theme, onToggleTheme }: HeaderProps) {
  const [searchOpen, setSearchOpen] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [query, setQuery] = useState("");
  const navigate = useNavigate();

  function submitSearch(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const value = query.trim();
    if (value) {
      navigate(`/search?q=${encodeURIComponent(value)}`);
      setSearchOpen(false);
      setMobileOpen(false);
    }
  }

  const navLinks = [
    { to: "/latest", label: "Latest" },
    { to: "/trending", label: "Trending" },
    { to: "/categories", label: "Explore" },
    { to: "/about", label: "About" },
  ];

  return (
    <header className="site-header">
      <div className="header-inner">
        <Link className="wordmark" to="/" aria-label="Signal and Next home" onClick={() => setMobileOpen(false)}>
          <span className="brand-icon" aria-hidden="true">s<span>.</span></span>
          <span className="brand-name">signal<span className="brand-amp">&</span>next</span>
        </Link>
        <nav className={`main-nav ${mobileOpen ? "is-open" : ""}`} aria-label="Main navigation">
          {navLinks.map((item) => (
            <NavLink key={item.to} to={item.to} onClick={() => setMobileOpen(false)}>
              {item.label}
            </NavLink>
          ))}
          <Link className="mobile-bookmarks" to="/saved" onClick={() => setMobileOpen(false)}>Saved stories</Link>
        </nav>
        <div className="header-actions">
          <button className="icon-button search-toggle" aria-label="Search stories" onClick={() => setSearchOpen((open) => !open)}>
            {searchOpen ? <X size={18} /> : <Search size={18} />}
          </button>
          <Link className="header-bookmark icon-button" to="/saved" aria-label="Saved stories"><Bookmark size={18} /></Link>
          <button className="icon-button theme-toggle" aria-label={`Switch to ${theme === "dark" ? "light" : "dark"} theme`} onClick={onToggleTheme}>
            {theme === "dark" ? <Sun size={18} /> : <Moon size={18} />}
          </button>
          <Link className="header-cta" to="/latest">Read the latest <ArrowDownRight size={15} /></Link>
          <button className="icon-button menu-toggle" aria-label={mobileOpen ? "Close menu" : "Open menu"} aria-expanded={mobileOpen} onClick={() => setMobileOpen((open) => !open)}>
            {mobileOpen ? <X size={20} /> : <Menu size={20} />}
          </button>
        </div>
      </div>
      {searchOpen && (
        <form className="search-bar" role="search" onSubmit={submitSearch}>
          <Search size={19} aria-hidden="true" />
          <input autoFocus aria-label="Search articles" placeholder="Search ideas, stories, and more..." value={query} onChange={(event) => setQuery(event.target.value)} />
          <button className="search-submit" type="submit">Search <ArrowRight size={15} /></button>
        </form>
      )}
    </header>
  );
}

type StoryCardProps = {
  story: Story;
  saved: boolean;
  onBookmark: (id: string) => void;
  index?: number;
  compact?: boolean;
};

export function StoryCard({ story, saved, onBookmark, index = 0, compact = false }: StoryCardProps) {
  return (
    <motion.article
      className={`story-card ${compact ? "story-card-compact" : ""}`}
      initial={{ opacity: 0, y: 18 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.1 }}
      transition={{ duration: 0.45, delay: Math.min(index * 0.055, 0.22) }}
    >
      <Link to={`/article/${slugify(story.title)}`} className="story-image-wrap" aria-label={`Read ${story.title}`}>
        <img className="story-image" src={story.image} alt={story.imageAlt} loading={index < 3 ? "eager" : "lazy"} />
        <span className="image-category">{story.category}</span>
      </Link>
      <div className="story-card-body">
        <div className="story-meta"><span>{story.date}</span><span className="meta-dot" /><span>{story.readTime}</span></div>
        <span className="story-origin">{story.source ? `SOURCE · ${story.source}` : "AI-GENERATED SAMPLE"}</span>
        <h3><Link to={`/article/${slugify(story.title)}`}>{story.title}</Link></h3>
        <p>{story.excerpt}</p>
        <div className="story-card-footer">
          <span className="byline">By {story.author}</span>
          <button className={`bookmark-button ${saved ? "is-saved" : ""}`} aria-label={saved ? `Remove ${story.title} from saved stories` : `Save ${story.title}`} aria-pressed={saved} onClick={() => onBookmark(story.id)}>
            <Bookmark size={17} fill={saved ? "currentColor" : "none"} />
          </button>
        </div>
      </div>
    </motion.article>
  );
}

export function FeaturedStory({ story, saved, onBookmark }: StoryCardProps) {
  return (
    <motion.article className="featured-story" initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.65 }}>
      <Link className="featured-image-wrap" to={`/article/${slugify(story.title)}`} aria-label={`Read ${story.title}`}>
        <img src={story.image} alt={story.imageAlt} />
        <span className="featured-image-note"><span className="pulse-dot" /> THE SIGNAL / 001</span>
      </Link>
      <div className="featured-copy">
        <div className="eyebrow"><span className="eyebrow-line" /> THIS WEEK'S SIGNAL</div>
        <span className="category-label">{story.category}</span>
        <span className="story-origin">{story.source ? `SOURCE · ${story.source}` : "AI-GENERATED SAMPLE"}</span>
        <h2><Link to={`/article/${slugify(story.title)}`}>{story.title}</Link></h2>
        <p>{story.excerpt}</p>
        <div className="featured-bottom">
          <div className="featured-byline">
            <span className="avatar">MC</span>
            <span><strong>{story.author}</strong><small>{story.date} <i /> {story.readTime}</small></span>
          </div>
          <button className={`bookmark-button featured-bookmark ${saved ? "is-saved" : ""}`} aria-label={saved ? "Remove featured story from saved stories" : "Save featured story"} aria-pressed={saved} onClick={() => onBookmark(story.id)}><Bookmark size={18} fill={saved ? "currentColor" : "none"} /></button>
        </div>
        <Link className="text-link" to={`/article/${slugify(story.title)}`}>Read the story <ArrowRight size={16} /></Link>
      </div>
    </motion.article>
  );
}

export function SectionTitle({ eyebrow, title, link, to }: { eyebrow?: string; title: string; link?: string; to?: string }) {
  return (
    <div className="section-title">
      <div>{eyebrow && <span className="eyebrow">{eyebrow}</span>}<h2>{title}</h2></div>
      {link && to && <Link className="text-link" to={to}>{link} <ArrowRight size={16} /></Link>}
    </div>
  );
}

export function Newsletter() {
  const [email, setEmail] = useState("");
  const [status, setStatus] = useState<"idle" | "success" | "duplicate">("idle");
  function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setStatus(subscribe(email) ? "success" : "duplicate");
    setEmail("");
  }
  return (
    <section className="newsletter">
      <div className="newsletter-orb" aria-hidden="true" />
      <div className="newsletter-copy">
        <span className="eyebrow"><span className="pulse-dot" /> THE NEXT NOTE</span>
        <h2>A little more signal.<br /><span>A lot less noise.</span></h2>
        <p>One thoughtful email, every Sunday. The ideas worth carrying into next week.</p>
      </div>
      <div className="newsletter-form-wrap">
        <form className="newsletter-form" onSubmit={handleSubmit}>
          <label className="sr-only" htmlFor="newsletter-email">Your email address</label>
          <input id="newsletter-email" type="email" placeholder="Your email address" autoComplete="email" value={email} onChange={(event) => setEmail(event.target.value)} required />
          <button type="submit" aria-label="Subscribe to newsletter">{status === "success" ? <Check size={19} /> : <ArrowRight size={19} />}</button>
        </form>
        <p className="newsletter-message" aria-live="polite">
          {status === "success" ? "You're on the list. See you Sunday." : status === "duplicate" ? "You're already on the list. Thanks for being here." : "No spam. Unsubscribe whenever."}
        </p>
        <div className="newsletter-readers"><div className="reader-avatars"><span>J</span><span>A</span><span>M</span><span>+</span></div><span>Join 2,400+ curious minds</span></div>
      </div>
    </section>
  );
}

export function Footer() {
  return (
    <footer className="site-footer">
      <div className="footer-main">
        <div className="footer-brand">
          <Link className="wordmark" to="/"><span className="brand-icon">s<span>.</span></span><span className="brand-name">signal<span className="brand-amp">&</span>next</span></Link>
          <p>Technology, thoughtfully.<br />A field guide to what comes next.</p>
          <div className="footer-social"><a href="https://www.instagram.com/" aria-label="Instagram">ig</a><a href="https://www.linkedin.com/" aria-label="LinkedIn">in</a><a href="https://x.com/" aria-label="X">x</a></div>
        </div>
        <div className="footer-links">
          <div><span className="footer-heading">EXPLORE</span><Link to="/latest">Latest stories</Link><Link to="/trending">Trending now</Link><Link to="/categories">All topics</Link><Link to="/saved">Saved stories</Link></div>
          <div><span className="footer-heading">THE JOURNAL</span><Link to="/about">About us</Link><Link to="/contact">Get in touch</Link><a href="mailto:hello@signalnext.example">Work with us</a></div>
        </div>
        <div className="footer-note"><span className="footer-heading">A NOTE TO YOUR INBOX</span><p>Less noise. More signal.<br />Join the Sunday letter.</p><Link className="footer-subscribe" to="/#newsletter">Get the next note <ArrowRight size={15} /></Link></div>
      </div>
      <div className="footer-bottom"><span>© {new Date().getFullYear()} Signal & Next. Made for the curious.</span><span>Independent by nature. Optimistic by design.</span><span className="footer-status"><i /> ALL SYSTEMS CURIOUS</span></div>
    </footer>
  );
}

export function CategoryTiles() {
  return (
    <div className="category-grid">
      {categories.map((category, index) => (
        <motion.div key={category.name} initial={{ opacity: 0, y: 14 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: index * 0.06 }}>
          <Link className="category-tile" to={`/category/${slugify(category.name)}`}>
            <span className="category-icon">{category.icon}</span>
            <span className="category-tile-text"><strong>{category.short}</strong><small>{category.count} stories</small></span>
            <ArrowDownRight size={17} className="category-arrow" />
          </Link>
        </motion.div>
      ))}
    </div>
  );
}

export function SearchResultsEmpty({ query }: { query?: string }) {
  return (
    <div className="empty-state">
      <span className="empty-icon"><Search size={22} /></span>
      <h2>{query ? "No stories found just yet." : "Nothing here just yet."}</h2>
      <p>{query ? `We couldn't find anything for “${query}”. Try a broader search or explore a topic.` : "Save a story as you read and it will find a home here."}</p>
      <Link className="button-primary" to="/latest">Explore the latest <ArrowRight size={16} /></Link>
    </div>
  );
}

export function CategoryShortcuts() {
  return <div className="category-shortcuts">{categories.map((category) => <Link key={category.name} to={`/category/${slugify(category.name)}`}>{category.short}</Link>)}</div>;
}
