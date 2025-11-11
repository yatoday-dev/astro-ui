> [!IMPORTANT]
> This library is still in early development. New changes can break existing functionality, and no functionality should be considered final at this stage. The library will be considered stable once it reaches v1.0.

This project is inspired by the following projects: [Astrowind](https://github.com/onwidget/astrowind), [Accessible Astro Components](https://github.com/incluud/accessible-astro-components/blob/main/Breadcrumbs.astro), [Webcoreui](https://github.com/Frontendland/webcoreui). 


## Publish package to npm

The build is done using Github Actions. See `.github/workflows/publish.yml` for more information.

1. Make a new release
```shell
npm version minor
```

```shell
git push origin {tag}
```
2. Go the project release page on Github, Draft a release and choose the tag you pushed before, write the release title, and publish it.
