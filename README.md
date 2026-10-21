# NET-DAS® v3.0 SCADA Mobile — Landing Page

Landing page moderna, ultra rápida y de alto impacto para la presentación y descarga de la aplicación móvil **NET-DAS v3.0 SCADA**.

---

## 🚀 Despliegue en Vercel & GitHub en 4 Pasos

### Paso 1: Inicializar Git y subir a GitHub
Desde tu terminal en tu Mac:

```bash
cd /Users/rebeca/netdas-web
git init
git add .
git commit -m "feat: landing page netdas scada mobile"
git branch -M main
git remote add origin https://github.com/TU_USUARIO/netdas-web.git
git push -u origin main
```

*(El archivo `.gitignore` ya está configurado para no intentar subir el APK pesado de 324 MB al código fuente, lo que evita que GitHub bloquee el `git push`).*

---

### Paso 2: Subir el APK a GitHub Releases (¡Gratis hasta 2 GB!)
1. Entra a tu repositorio en GitHub: `https://github.com/TU_USUARIO/netdas-web` (o tu repo de la app).
2. Haz clic a la derecha en **Releases** > **Create a new release** (o "Draft a new release").
3. Asigna la etiqueta `v3.0.0` y el título `NET-DAS SCADA Mobile v3.0.0`.
4. Arrastra y suelta allí tu archivo APK (`/Users/rebeca/netdas-scada/android/app/build/outputs/apk/debug/app-debug.apk`).
5. Publica la release (**Publish release**).
6. Copia el enlace de descarga directa del APK generado por GitHub (ejemplo: `https://github.com/TU_USUARIO/netdas-web/releases/download/v3.0.0/netdas-scada-v3.0.apk`).

---

### Paso 3: Vincular el Enlace en la Web
Abre `app.js` en tu proyecto y pega tu enlace en la constante `CONFIG_APK_URL` (Línea 282):

```javascript
const CONFIG_APK_URL = 'https://github.com/TU_USUARIO/netdas-web/releases/download/v3.0.0/netdas-scada-v3.0.apk';
```

*(El código QR y el botón de descarga se actualizarán de forma automática e instantánea a esa URL).*

Haz un commit rápido:
```bash
git add app.js
git commit -m "fix: vincular enlace de descarga oficial del APK"
git push
```

---

### Paso 4: Conectar con Vercel
1. Entra a [vercel.com](https://vercel.com) e inicia sesión con tu cuenta de GitHub.
2. Haz clic en **Add New...** > **Project**.
3. Selecciona tu repositorio `netdas-web`.
4. Deja la configuración por defecto (Framework Preset: **Other**) y haz clic en **Deploy**.
5. ¡Listo! Vercel te dará tu enlace en vivo (ejemplo: `https://netdas-web.vercel.app`).
