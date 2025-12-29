# Epic Games Front-End Layihəsi

Bu layihə, Epic Games mağazasının front-end tətbiqini React və Vite istifadə edərək hazırlanmış veb tətbiqidir. İstifadəçilərin oyunları kəşf etməsi, satın alması, wishlist-ə əlavə etməsi və hesab idarəetməsi üçün nəzərdə tutulmuşdur.

## Texnologiya Stack

- **Framework:** React 18
- **Build Tool:** Vite
- **Styling:** Tailwind CSS
- **Routing:** React Router DOM
- **Icons:** Lucide React
- **UI Components:** Shadcn/ui (Button, Input, Select, vb.)
- **State Management:** React Context API
- **Data:** JSON faylları (data.json, news.json)

## Layihə Strukturu

### Səhifələr (Pages)

#### 1. Ana Səhifə (`/`)
- **İstifadə Olunan Komponentlər:** Header, SecondHeader, Footer, HeroSection, WeeklyDeals, FreeGames, VerticalGameList, GameSlider
- **Context'lər:** LanguageContext
- **Veri Mənbələri:** data.json
- **Xüsusiyyətlər:** Ana səhifə slayderları, endirimli oyunlar, pulsuz oyunlar, ən çox satılanlar siyahısı

#### 2. Axtarış (`/browse`)
- **İstifadə Olunan Komponentlər:** Header, SecondHeader, Footer, FilterSidebar, GameGrid, Pagination, GenreSlider
- **Hooks:** useSearchParams, useNavigate
- **Veri Mənbələri:** data.json
- **Xüsusiyyətlər:** Oyun axtarışı, filtrləmə (qiymət, janr, platforma, vb.), sıralama, səhifələmə

#### 3. Oyun Detalları (`/game/:gameId`)
- **İstifadə Olunan Komponentlər:** Header, SecondHeader, Footer
- **Context'lər:** WishlistContext, CartContext, AuthContext
- **Hooks:** useParams, useLocation, useNavigate
- **Veri Mənbələri:** data.json
- **Xüsusiyyətlər:** Oyun detalları, səbətə əlavə etmə, wishlist-ə əlavə etmə, tab'lar (ümumi baxış, əlavələr, nailiyyətlər)

#### 4. Səbət (`/cart`)
- **İstifadə Olunan Komponentlər:** Header, SecondHeader, Footer
- **Context'lər:** CartContext, AuthContext, LanguageContext
- **Hooks:** useNavigate, useLocation
- **Xüsusiyyətlər:** Səbət idarəetməsi, miqdar yeniləmə, cəm hesablama, satın alma simulyasiyası (qorunan səhifə)

#### 5. Wishlist (`/wishlist`)
- **İstifadə Olunan Komponentlər:** Header, SecondHeader, Footer
- **Context'lər:** WishlistContext, AuthContext, CartContext, LanguageContext
- **Hooks:** useNavigate, useLocation
- **Xüsusiyyətlər:** Wishlist elementləri siyahısı, filtrləmə, sıralama, səbətə əlavə etmə

#### 6. Daxil Olma (`/login`)
- **İstifadə Olunan Komponentlər:** LoginPasswordForm
- **Xüsusiyyətlər:** Daxil olma formu

#### 7. Qeydiyyat (`/signup`)
- **İstifadə Olunan Komponentlər:** SignUpForm
- **Xüsusiyyətlər:** Qeydiyyat formu (çox mərhələli)

#### 8. Profil (`/profile`)
- **İstifadə Olunan Komponentlər:** Header, SecondHeader, Footer
- **Context'lər:** AuthContext
- **Hooks:** useNavigate, useLocation
- **Xüsusiyyətlər:** Profil məlumatlarının redaktəsi (qorunan səhifə)

#### 9. Xəbərlər (`/news`)
- **İstifadə Olunan Komponentlər:** Header, SecondHeader, Footer, NewsCard
- **Veri Mənbələri:** news.json
- **Xüsusiyyətlər:** Xəbər siyahısı, seçilmiş xəbərlər

#### 10. Xəbər Detalları (`/news/:slug`)
- **İstifadə Olunan Komponentlər:** Header, SecondHeader, Footer
- **Hooks:** useParams
- **Veri Mənbələri:** news.json
- **Xüsusiyyətlər:** Xəbər detal səhifəsi, əlaqəli xəbərlər

#### 11. Hədiyyələr (`/gifts`)
- **İstifadə Olunan Komponentlər:** Header, SecondHeader, Footer
- **Context'lər:** AuthContext, LanguageContext
- **Hooks:** useNavigate, useLocation
- **Xüsusiyyətlər:** Hədiyyə tarixçəsi, tab'larla filtrləmə (qorunan səhifə)

### Context'lər

- **AuthContext:** İstifadəçi identifikasiyası və profil idarəetmə
- **CartContext:** Səbət əməliyyatları
- **WishlistContext:** İstək siyahısı idarəetmə
- **LanguageContext:** Çoxdilli dəstək

### Komponentlər (Components)

#### Header Bölməsi
- **Header:** Əsas naviqasiya menyusu
- **SecondHeader:** Axtarış çubuğu və istifadəçi menyusu

#### Ana Səhifə Komponentləri
- **HeroSection:** Ana səhifə hero sahəsi
- **GameSlider:** Oyun slayderi
- **WeeklyDeals:** Həftəlik endirimlər
- **FreeGames:** Pulsuz oyunlar
- **VerticalGameList:** Vertikal oyun siyahısı

#### Axtarış Bölməsi
- **FilterSidebar:** Filtr yan çubuğu
- **GameGrid:** Oyun qrizi
- **Pagination:** Səhifələmə
- **GenreSlider:** Janr slayderi

#### Daxil Olma/Qeydiyyat Bölməsi
- **LoginPasswordForm:** Şifrə daxil olma formu
- **SignUpForm:** Qeydiyyat formu və alt komponentləri

#### UI Komponentləri
- Button, Input, Select, Checkbox, Dropdown, vb. (Shadcn/ui)

### Veri Strukturu

#### data.json
- Oyun məlumatları, qiymətlər, endirimlər, media, vb.

#### news.json
- Xəbər məqalələri, kateqoriyalar, məzmunlar

## Qurulum və İşə Salma

1. **Asılılıqları yükləyin:**
   ```bash
   npm install
   ```

2. **İnkişaf serverini işə salın:**
   ```bash
   npm run dev
   ```

3. **Build yaradın:**
   ```bash
   npm run build
   ```

4. **Önizləmə üçün:**
   ```bash
   npm run preview
   ```

## Xüsusiyyətlər

- 🔍 **Oyun Axtarışı və Filtrləmə:** Qiymət, janr, platforma, vb. filtrlər
- 🛒 **Səbət İdarəetmə:** Oyun əlavə etmə, çıxarma, miqdar yeniləmə
- ❤️ **Wishlist:** Sevimli oyunları saxlama
- 👤 **İstifadəçi Hesabı:** Daxil olma, qeydiyyat, profil idarəetmə
- 📰 **Xəbərlər:** Epic Games xəbərləri
- 🎁 **Hədiyyələr:** Hədiyyə göndərmə və alma
- 🌐 **Çoxdilli Dəstək:** Azərbaycan və İngilis dilləri
- 📱 **Responsive Dizayn:** Mobil uyğun

## Qeydlər

- Bu layihə demo məqsədli olub və real satın alma sistemi ehtiva etmir
- İstifadəçi məlumatları localStorage-da saxlanılır
- API inteqrasiyası mövcud deyil, JSON faylları istifadə olunur
