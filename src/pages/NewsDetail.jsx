import React from 'react';
import { Link, useParams } from 'react-router-dom';
import Header from '@/components/Header/Header';
import SecondHeader from '@/components/Header/SecondHeader';
import Footer from '@/components/Footer/Footer';
import newsData from '@/data/news.json';

const formatDate = (value) => {
  const date = new Date(value);
  if (Number.isNaN(date.getTime())) return value;
  return date.toLocaleDateString('tr-TR', {
    day: 'numeric',
    month: 'long',
    year: 'numeric'
  });
};

export default function NewsDetail() {
  const { slug } = useParams();
  const article = newsData.find((item) => item.slug === slug);

  if (!article) {
    return (
      <div className="min-h-screen w-full bg-[#101014] text-white">
        <Header />
        <SecondHeader />
        <div className="flex flex-col items-center justify-center py-20">
          <h2 className="text-2xl font-bold mb-3">Haber bulunamadı</h2>
          <Link to="/news" className="text-[#9bd2ff] hover:text-white">
            Haberler sayfasına dön
          </Link>
        </div>
        <Footer />
      </div>
    );
  }

  const meta = `${formatDate(article.publishedAt)} • ${article.readTime}`;
  const related = newsData.filter((item) => item.id !== article.id).slice(0, 3);

  return (
    <>
      <div className="min-h-screen w-full bg-[#101014] text-white">
        <Header />
        <main className="mx-auto max-w-[1185px] px-5 py-3 sm:max-w-[770px] lg:max-w-[1050px] xl:max-w-[1185px] 2xl:max-w-[1440px]">
          <SecondHeader />

          <article className="py-10">
            <div className="overflow-hidden rounded-2xl border border-[#1f1f24] bg-[#0f0f13]">
              <div className="relative aspect-[16/8] w-full overflow-hidden">
                <img
                  src={article.heroImage || article.thumbnail}
                  alt={article.title}
                  className="h-full w-full object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent" />
                <div className="absolute bottom-0 left-0 right-0 p-6 sm:p-10">
                  <div className="flex flex-wrap items-center gap-3 text-xs text-white/80">
                    <span className="rounded-full bg-white/10 px-3 py-1 text-[11px] font-semibold uppercase tracking-wide">
                      {article.category}
                    </span>
                    <span>{meta}</span>
                    <span>•</span>
                    <span>{article.author}</span>
                  </div>
                  <h1 className="mt-3 text-3xl font-bold leading-tight sm:text-4xl">
                    {article.title}
                  </h1>
                </div>
              </div>

              <div className="space-y-8 p-6 sm:p-10">
                {article.content?.map((block, idx) => {
                  if (block.image) {
                    return (
                      <figure key={idx} className="overflow-hidden rounded-xl border border-[#1f1f24] bg-[#101018]">
                        <img src={block.image} alt={block.caption || article.title} className="w-full object-cover" />
                        {block.caption && (
                          <figcaption className="px-4 py-3 text-sm text-[#b3b3b8]">{block.caption}</figcaption>
                        )}
                      </figure>
                    );
                  }

                  return (
                    <section key={idx} className="space-y-2">
                      {block.heading && <h3 className="text-xl font-semibold">{block.heading}</h3>}
                      {block.body && <p className="text-[#c6c6ca] leading-relaxed">{block.body}</p>}
                    </section>
                  );
                })}

                {article.tags && article.tags.length > 0 && (
                  <div className="flex flex-wrap gap-2 pt-2">
                    {article.tags.map((tag) => (
                      <span
                        key={tag}
                        className="rounded-full bg-[#1c1c22] px-3 py-1 text-xs font-semibold text-white"
                      >
                        #{tag}
                      </span>
                    ))}
                  </div>
                )}
              </div>
            </div>

            <div className="mt-10">
              <div className="flex items-center justify-between mb-4">
                <h2 className="text-xl font-semibold">İlginizi çekebilecek diğer haberler</h2>
                <Link to="/news" className="text-sm text-[#9bd2ff] hover:text-white">Tüm haberler</Link>
              </div>
              <div className="grid grid-cols-1 gap-4 md:grid-cols-3">
                {related.map((item) => (
                  <Link
                    key={item.id}
                    to={`/news/${item.slug}`}
                    className="group overflow-hidden rounded-xl border border-[#1f1f24] bg-[#0f0f13] transition hover:-translate-y-1 hover:border-[#2f2f36]"
                  >
                    <div className="relative h-40 w-full overflow-hidden">
                      <img
                        src={item.thumbnail || item.heroImage}
                        alt={item.title}
                        className="h-full w-full object-cover transition duration-500 group-hover:scale-105"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent" />
                      <p className="absolute bottom-2 left-2 right-2 text-[11px] font-semibold uppercase tracking-wide text-white">
                        {item.category}
                      </p>
                    </div>
                    <div className="space-y-2 p-4">
                      <p className="text-xs text-[#8c8c90]">{formatDate(item.publishedAt)} • {item.readTime}</p>
                      <h3 className="text-base font-semibold text-white group-hover:text-[#9bd2ff] leading-tight">
                        {item.title}
                      </h3>
                    </div>
                  </Link>
                ))}
              </div>
            </div>
          </article>
        </main>
      </div>
      <Footer />
    </>
  );
}

