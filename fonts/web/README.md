# Web font subsets

The site loads these files, not the full fonts one folder up. Each is a Latin subset of
the matching file in `fonts/` (about 27 KB instead of about 180 KB), which keeps mobile
load times down. Only the OpenType features the site uses are kept, including `tnum`
for `tabular-nums`. If you start using another feature (stylistic sets, for example),
add its tag to `F` and rerun.

Licence: SIL Open Font License, see `../OFL.txt`.

To regenerate after replacing a font (needs `pip install fonttools brotli`):

```bash
U="U+0000-00FF,U+0131,U+0152-0153,U+02BB-02BC,U+02C6,U+02DA,U+02DC,U+0304,U+0308,U+0329,U+2000-206F,U+20AC,U+2122,U+2190-2199,U+2212,U+2215,U+2713,U+FEFF,U+FFFD"
F="kern,liga,calt,ccmp,locl,mark,mkmk,case,tnum,lnum,pnum"
for f in Inter-Regular Inter-Medium Inter-SemiBold InterDisplay-SemiBold; do
  pyftsubset "fonts/$f.woff2" --unicodes="$U" --layout-features="$F" --flavor=woff2 --output-file="fonts/web/$f.latin.woff2"
done
```

The range matches Google Fonts' "latin" subset. Letters outside it (for example Polish or
Czech accents in a name typed into the form) fall back to the system font. If the copy
starts using a character outside these ranges, add it to `U` and rerun.
