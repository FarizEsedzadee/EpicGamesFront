import React from 'react';
import { Link } from 'react-router-dom';
import Header from '@/components/Header/Header';
import SecondHeader from '@/components/Header/SecondHeader';
import Footer from '@/components/Footer/Footer';
import newsData from '@/data/news.json';

const formatDate = (value) => {
  const date = new Date(value);
  if (Number.isNaN(date.getTime())) return value;
  return date.toLocaleDateString('tr-TR', {
    day: 'numeric',
    month: 'short',
    year: 'numeric'
  });
};

const NewsCard = ({ item, variant = 'featured' }) => {
  const meta = `${formatDate(item.publishedAt)} • ${item.readTime}`;

  if (variant === 'featured') {
    return (
      <Link
        to={`/news/${item.slug}`}
        className="group overflow-hidden rounded-xl border border-[#1f1f24] bg-[#0f0f13] transition hover:-translate-y-1 hover:border-[#2f2f36]"
      >
        <div className="relative aspect-video w-full overflow-hidden">
          <img
            src={item.heroImage || item.thumbnail}
            alt={item.title}
            className="h-full w-full object-cover transition duration-500 group-hover:scale-105"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/30 to-transparent" />
          <div className="absolute bottom-4 left-4 right-4">
            <span className="inline-block rounded-full bg-white/10 px-3 py-1 text-xs font-semibold text-white backdrop-blur">
              {item.category}
            </span>
            <p className="mt-2 text-sm text-white/80">{meta}</p>
            <h3 className="mt-2 text-lg font-semibold leading-tight text-white group-hover:text-[#9bd2ff]">
              {item.title}
            </h3>
          </div>
        </div>
        <div className="space-y-3 p-4">
          <p className="text-sm text-[#c6c6ca]">{item.summary}</p>
          <div className="flex items-center gap-2 text-xs text-[#8c8c90]">
            <span>{item.author}</span>
          </div>
        </div>
      </Link>
    );
  }

  return (
    <Link
      to={`/news/${item.slug}`}
      className="group flex flex-col gap-3 border-t border-[#1f1f24] px-2 py-5 first:border-t-0 sm:flex-row sm:items-center"
    >
      <div className="relative h-36 w-full overflow-hidden rounded-lg bg-[#15151b] sm:h-28 sm:w-52 flex-shrink-0">
        <img
          src={item.thumbnail || item.heroImage}
          alt={item.title}
          className="h-full w-full object-cover transition duration-500 group-hover:scale-105"
        />
      </div>
      <div className="flex-1 space-y-2">
        <div className="flex items-center gap-2 text-xs text-[#8c8c90]">
          <span className="rounded-full bg-[#1c1c22] px-2 py-1 text-[11px] font-semibold text-white">{item.category}</span>
          <span>{meta}</span>
        </div>
        <h3 className="text-lg font-semibold text-white group-hover:text-[#9bd2ff] leading-tight">{item.title}</h3>
        <p className="text-sm text-[#c6c6ca] line-clamp-2">{item.summary}</p>
      </div>
    </Link>
  );
};

export default function News() {
  const featured = newsData.slice(0, 2);
  const rest = newsData.slice(2);

  return (
    <>
      <div className="min-h-screen w-full bg-[#101014] text-white">
        <Header />
        <main className="mx-auto max-w-[1185px] px-5 py-3 sm:max-w-[770px] lg:max-w-[1050px] xl:max-w-[1185px] 2xl:max-w-[1440px]">
          <SecondHeader />

          <div className="py-10 space-y-10">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm uppercase tracking-[0.2em] text-[#8c8c90]">Epic Games Haberler</p>
                <h1 className="text-3xl font-bold mt-2">Mağazadan son gelişmeler</h1>
              </div>
            </div>

            <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
              {featured.map((item) => (
                <NewsCard key={item.id} item={item} variant="featured" />
              ))}
            </div>

            <div className="rounded-xl border border-[#1f1f24] bg-[#0f0f13]">
              {rest.map((item) => (
                <NewsCard key={item.id} item={item} variant="list" />
              ))}
            </div>
          </div>
        </main>
      </div>
      <Footer />
    </>
  );
}

