# Animated Logo

The animated logo graphic for [our site](https://alefalefalef.co.il)

![Screenshot](logo.gif)

### Development

Download the necessary fonts:

```bash
fonts=(
    "synopsis/synopsis-demibold-aaa.woff"
    "ploni/ploni-regular-aaa.woff2"
);

echo ${fonts[@]} | xargs -n 1 -I% curl --output "fonts/%" --create-dirs "https://alefalefalef.co.il/wp-content/fonts/%";
```
