NauMovie - cara pakai
1. Di Supabase > Authentication > Providers > Email: MATIKAN "Confirm email".
2. Jalankan lewat server statis (mis. `npx serve .` atau upload ke Netlify/Vercel). Jangan buka file:// langsung.
3. Daftar akun PERTAMA = otomatis ADMIN. Berikutnya user biasa.
4. Admin lain: UPDATE public.profiles SET role='admin' WHERE username='namamu';
5. Ganti video contoh SpongeBob di panel Admin dengan link CDN / upload milikmu.
6. Series: tambah episode lewat panel Admin > Tambah episode, atau import JSON dengan field episodes.
