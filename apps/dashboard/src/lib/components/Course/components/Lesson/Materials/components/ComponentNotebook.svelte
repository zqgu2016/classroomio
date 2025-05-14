<script lang="ts">
  import { env } from '$env/dynamic/public';
  import { lesson } from '../../store/lessons';

  let url = '';

  function canvaHandler(_url): string {
    if (_url.includes('?embed')) return _url;

    return `${_url}?embed`;
  }

  function getUrl(_url: string | null): string | undefined {
    if (!_url) return;

    console.log({ _url });
    if (_url.includes('www.canva.com')) {
      return canvaHandler(_url);
    }

    return `${env.PUBLIC_NOTEBOOK_URL}/notebooks/work/${_url}?token=${env.PUBLIC_NOTEBOOK_TOKEN}`;
  }

  $: url = getUrl($lesson.materials.notebook_url);
</script>

<iframe title="JupyterLab" id="microapp-JupyterLab" frameborder="0" scrolling="no" src={url}
></iframe>

<style>
  iframe {
    width: 100%;
    height: 100%;
  }
</style>
