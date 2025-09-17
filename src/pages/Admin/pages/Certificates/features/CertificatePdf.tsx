import {
  Document,
  Page,
  Text,
  View,
  Image,
  StyleSheet,
  Font,
} from "@react-pdf/renderer";

/* =======================
   Fuentes locales (TTF)
   ======================= */
Font.register({
  family: "Playfair Display",
  fonts: [
    { src: "/fonts/PlayfairDisplay.ttf", fontWeight: "normal" },
    { src: "/fonts/PlayfairDisplay-Italic.ttf", fontWeight: "bold" },
  ],
});

Font.register({
  family: "Afacad",
  fonts: [
    { src: "/fonts/Afacad.ttf", fontWeight: "normal" },
    { src: "/fonts/Afacad-Italic.ttf", fontWeight: "600" as any },
  ],
});

/* Helpers */
const asImageSrc = (u?: string) =>
  typeof u === "string" && u.trim().length > 0 ? u : undefined;

const isRaster = (u?: string) =>
  !!u && /\.(png|jpe?g|webp)$/i.test((u.split("?")[0] || "").trim());

/* =======================
   Estilos
   ======================= */
const styles = StyleSheet.create({
  page: {
    backgroundColor: "#ffffff",
    paddingTop: 28,
    paddingBottom: 28,
    paddingHorizontal: 32, // + margen lateral
  },
  frame: {
    borderWidth: 4,
    borderColor: "#C9A552",
    padding: 36, // + respiro interior
  },

  /* Header */
  headerRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    // Reducimos espacio superior del título para que iguale el margen del footer
    marginBottom: 18,
  },
  logo: { width: 150, height: 82, objectFit: "contain" },
  seal: { width: 150, height: 82, objectFit: "contain" },

  /* Títulos centrales */
  title: {
    fontFamily: "Playfair Display",
    fontSize: 30,
    textAlign: "center",
    marginBottom: 8,
  },
  subtitle: {
    fontFamily: "Afacad",
    fontSize: 12,
    textAlign: "center",
    color: "#444",
    lineHeight: 1.6,
    marginHorizontal: 60, // texto más estrecho para “centrado óptico”
    marginBottom: 14,
  },

  /* Separador ornamental (imagen) */
  ornamentBox: {
    height: 50, // reserva de espacio
    display: "flex",
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    marginBottom: 14,
  },
  ornamentImg: { height: 520, width: 520, objectFit: "contain" },

  /* “Adquiriente” y nombre */
  sectionTitle: {
    textAlign: "center",
    fontFamily: "Playfair Display",
    fontSize: 16,
    color: "#8A6A1A",
    marginBottom: 8,
  },
  buyerName: {
    textAlign: "center",
    fontFamily: "Playfair Display",
    fontSize: 22,
    marginBottom: 18,
  },

  /* 3 columnas: imagen | etiquetas | valores */
  threeCols: {
    flexDirection: "row",
    alignItems: "stretch",
  },

  // Col 1: foto
  photoBox: {
    width: 128,
    height: 128,
    borderWidth: 1,
    borderColor: "#BDBDBD",
    justifyContent: "center",
    alignItems: "center",
    marginRight: 128,
  },
  photo: { width: 128, height: 128 },

  // Col 2: labels
  labelsCol: {
    width: 120,
    paddingTop: 4,
  },
  label: {
    fontFamily: "Afacad",
    fontSize: 11,
    color: "#5b5b5b",
    marginBottom: 10,
    textAlign: "right",
  },

  // Col 3: values
  valuesCol: {
    flex: 1,
    paddingTop: 4,
    paddingLeft: 16,
  },
  value: {
    fontFamily: "Afacad",
    fontSize: 11,
    color: "#111",
    marginBottom: 10,
  },

  /* Separador inferior sutil (si aún no hay ornamento de cierre) */
  softDivider: {
    marginTop: 22,
    marginBottom: 12,
    height: 1,
    backgroundColor: "#E6D4A5",
  },

  /* Footer centrado */
  footer: {
    marginTop: 6,
    textAlign: "center",
    fontFamily: "Afacad",
    color: "#444",
  },
  footerLine: { fontSize: 10, marginBottom: 4 },
  footerCity: { fontSize: 10, marginTop: 6 },
});

/* Tipado */
type CatalogItem = { id: number; nombre: string };

export type CertificatePdfProps = {
  data: {
    tiendaNombre: string;
    tiendaDireccion: string;
    clienteNombre: string;
    clienteDnioRUC: string;
    productoNombre: string;
    gemaId?: number;
    materialId?: number;
    precio?: number;
    imagenUrl?: string;
    pais?: string;
    descripcion?: string;
    fechaEmision?: string;
    // peso?: string;
  };
  assets?: {
    logoUrl?: string; // sello/ornamento llegan por props
    selloUrl?: string;
    ornamentUrl?: string; // separador decorativo
  };
  lookups?: {
    gemas?: CatalogItem[];
    materiales?: CatalogItem[];
  };
};

/* Helpers */
const nameById = (list?: CatalogItem[], id?: number) =>
  (id && list?.find((x) => Number(x.id) === Number(id))?.nombre) || undefined;

const fmtDate = (iso?: string) => {
  try {
    if (!iso) return "";
    const d = new Date(iso);
    return d.toLocaleDateString("es-PE");
  } catch {
    return "";
  }
};

const money = (n?: number) =>
  typeof n === "number"
    ? new Intl.NumberFormat("es-PE", {
        style: "currency",
        currency: "PEN",
      }).format(n)
    : "";

/* =======================
   Componente
   ======================= */
export default function CertificatePdf({
  data,
  assets,
  lookups,
}: CertificatePdfProps) {
  // Logo/sello/ornamento PNG desde public/ con defaults para que siempre aparezcan
  const requestedLogo = assets?.logoUrl ?? "/CentroJoyeroLogo.png?v=1"; // public/CentroJoyeroLogo.png
  const requestedSeal = assets?.selloUrl ?? "/SelloCalidad.png"; // public/SelloCalidad.png
  const requestedOrnament = assets?.ornamentUrl ?? "/OrnamentoAdquiriente.png"; // public/OrnamentoAdquiriente.png

  const logo = isRaster(requestedLogo)
    ? requestedLogo
    : "/CentroJoyeroLogo.png?v=1";
  const sello = isRaster(requestedSeal) ? requestedSeal : "/SelloCalidad.png";
  const ornament = isRaster(requestedOrnament) ? requestedOrnament : undefined; // separador decorativo

  const foto = asImageSrc(data.imagenUrl);

  const gemaNombre = nameById(lookups?.gemas, data.gemaId);
  const materialNombre = nameById(lookups?.materiales, data.materialId);

  return (
    <Document>
      <Page size="A4" orientation="landscape" style={styles.page}>
        <View style={styles.frame}>
          {/* Header */}
          <View style={styles.headerRow}>
            {logo ? <Image src={logo} style={styles.logo} /> : <View />}
            {sello ? <Image src={sello} style={styles.seal} /> : <View />}
          </View>

          {/* Título y texto central */}
          <Text style={styles.title}>CERTIFICADO DE AUTENTICIDAD</Text>
          <Text style={styles.subtitle}>
            Centro Joyero certifica que la joya descrita a continuación es
            auténtica y ha sido elaborada con materiales de alta calidad. Este
            certificado garantiza la excelencia en diseño, fabricación y
            cumplimiento de los estándares internacionales.
          </Text>

          {/* Separador ornamental (deja el espacio; si no hay imagen, queda vacío) */}
          <View style={styles.ornamentBox}>
            {ornament ? (
              <Image src={ornament} style={styles.ornamentImg} />
            ) : null}
          </View>

          {/* Adquiriente y nombre en grande */}
          <Text style={styles.buyerName}>{data.clienteNombre}</Text>

          {/* 3 columnas */}
          <View style={styles.threeCols}>
            {/* Col 1: Imagen */}
            <View style={styles.photoBox}>
              {foto ? (
                <Image src={foto} style={styles.photo} />
              ) : (
                <Text
                  style={{
                    fontFamily: "Afacad",
                    fontSize: 10,
                    color: "#888",
                    textAlign: "center",
                    paddingHorizontal: 8,
                  }}
                >
                  FOTO JOYA O{"\n"}IMAGEN REFERENCIAL
                </Text>
              )}
            </View>

            {/* Col 2: Labels */}
            <View style={styles.labelsCol}>
              <Text style={styles.label}>País:</Text>
              <Text style={styles.label}>Descripción:</Text>
              <Text style={styles.label}>Piedra preciosa:</Text>
              <Text style={styles.label}>Material:</Text>
              <Text style={styles.label}>Precio:</Text>
              <Text style={styles.label}>Fecha:</Text>
            </View>

            {/* Col 3: Valores */}
            <View style={styles.valuesCol}>
              <Text style={styles.value}>{data.pais || "-"}</Text>
              <Text style={styles.value}>{data.descripcion || "-"}</Text>
              <Text style={styles.value}>
                {gemaNombre || (data.gemaId ? `#${data.gemaId}` : "-")}
              </Text>
              <Text style={styles.value}>
                {materialNombre ||
                  (data.materialId ? `#${data.materialId}` : "-")}
              </Text>
              <Text style={styles.value}>{money(data.precio)}</Text>
              <Text style={styles.value}>{fmtDate(data.fechaEmision)}</Text>
            </View>
          </View>

          {/* Separación sutil antes del footer */}
          <View style={styles.softDivider} />

          {/* Footer centrado */}
          <View style={styles.footer}>
            <Text style={styles.footerLine}>Centro Joyero</Text>
            <Text style={styles.footerLine}>
              Telf: +51 997 136 771 | Web: centrojoyero.com
            </Text>
            <Text style={styles.footerLine}>
              Avenida Du 5245, Miraflores 15074.
            </Text>
            <Text style={styles.footerCity}>Lima - Perú</Text>
          </View>
        </View>
      </Page>
    </Document>
  );
}
