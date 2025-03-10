> [!IMPORTANT]
> This library is still in early development. New changes can break existing functionality, and no functionality should be considered final at this stage. The library will be considered stable once it reaches v1.0.


## Publish package to npm

The build is done using Github Actions. See `.github/workflows/publish.yml` for more information.

1. Make a new release
```shell
git tag -a {tag} -m 'tag message here'
```

```shell
git push origin {tag}
```
2. Go the project release page on Github, Draft a release and choose the tag you pushed before, write the release title, and publish it.
