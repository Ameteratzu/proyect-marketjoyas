import {
  Document,
  Page,
  Text,
  View,
  Image,
  StyleSheet,
  Font,
} from "@react-pdf/renderer";

// === Registro de fuentes TTF servidas desde /public ===
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

// Acepta cualquier string como src (react-pdf se quejaba por URLs sin extensión)
const asImageSrc = (u?: string) =>
  typeof u === "string" && u.trim().length > 0 ? u : undefined;

const styles = StyleSheet.create({
  page: { padding: 28, backgroundColor: "#ffffff" },
  frame: { borderWidth: 4, borderColor: "#C9A552", padding: 20 },
  headerRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 16,
  },
  logo: { width: 110, height: 40 },
  title: {
    fontFamily: "Playfair Display",
    fontWeight: "bold",
    fontSize: 24,
    textAlign: "center",
    marginBottom: 6,
  },
  subtitle: {
    fontFamily: "Afacad",
    fontSize: 10,
    textAlign: "center",
    color: "#444",
    lineHeight: 1.4,
    marginBottom: 12,
  },
  divider: { height: 1, backgroundColor: "#C9A552", marginVertical: 6 },
  sectionRow: { flexDirection: "row", marginTop: 10 },
  photoBox: {
    width: 160,
    height: 160,
    borderWidth: 1,
    borderColor: "#BDBDBD",
    justifyContent: "center",
    alignItems: "center",
    marginRight: 14,
  },
  photo: { width: 160, height: 160 },
  label: { fontFamily: "Afacad", fontSize: 9, color: "#666" },
  value: { fontFamily: "Afacad", fontSize: 10 },
  kv: { marginBottom: 6 },
  sectionTitle: {
    textAlign: "center",
    fontFamily: "Playfair Display",
    fontSize: 12,
    marginVertical: 6,
    color: "#8A6A1A",
  },
  footer: {
    marginTop: 22,
    borderTopWidth: 1,
    borderColor: "#E5E5E5",
    paddingTop: 10,
    fontFamily: "Afacad",
    fontSize: 9,
    color: "#444",
    textAlign: "center",
    lineHeight: 1.4,
  },
});

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
  };
  assets?: { logoUrl?: string; selloUrl?: string };
  lookups?: {
    gemas?: CatalogItem[];
    materiales?: CatalogItem[];
  };
};

// Helper para buscar nombre por id
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

export default function CertificatePdf({ data, assets, lookups }: CertificatePdfProps) {
  const logo = asImageSrc(
    assets?.logoUrl ?? "/assets/products/logo_pandora.png"
  );
  const sello = asImageSrc(assets?.selloUrl);
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
            {sello ? (
              <Image src={sello} style={{ width: 64, height: 64 }} />
            ) : (
              <View />
            )}
          </View>

          <Text style={styles.title}>CERTIFICADO DE AUTENTICIDAD</Text>
          <Text style={styles.subtitle}>
            Market Joyas certifica que la joya descrita a continuación es
            auténtica y fue elaborada con materiales de alta calidad.
          </Text>

          <View style={styles.divider} />

          <Text style={styles.sectionTitle}>Adquiriente</Text>

          <View style={styles.sectionRow}>
            <View style={styles.photoBox}>
              {foto ? (
                <Image src={foto} style={styles.photo} />
              ) : (
                <Text
                  style={{
                    fontFamily: "Afacad",
                    fontSize: 9,
                    color: "#888",
                    textAlign: "center",
                  }}
                >
                  FOTO JOYA O IMAGEN REFERENCIAL
                </Text>
              )}
            </View>

            <View style={{ flex: 1 }}>
              <View style={styles.kv}>
                <Text style={styles.label}>Adquiriente</Text>
                <Text style={styles.value}>{data.clienteNombre}</Text>
              </View>
              <View style={styles.kv}>
                <Text style={styles.label}>País</Text>
                <Text style={styles.value}>{data.pais}</Text>
              </View>
              <View style={styles.kv}>
                <Text style={styles.label}>Descripción</Text>
                <Text style={styles.value}>{data.descripcion}</Text>
              </View>
              <View style={styles.kv}>
                <Text style={styles.label}>Piedra preciosa</Text>
                <Text style={styles.value}>
                  {gemaNombre || (data.gemaId ? `#${data.gemaId}` : "-")}
                </Text>
              </View>
              <View style={styles.kv}>
                <Text style={styles.label}>Material</Text>
                <Text style={styles.value}>
                  {materialNombre || (data.materialId ? `#${data.materialId}` : "-")}
                </Text>
              </View>
              <View style={styles.kv}>
                <Text style={styles.label}>Precio</Text>
                <Text style={styles.value}>{money(data.precio)}</Text>
              </View>
              <View style={styles.kv}>
                <Text style={styles.label}>Fecha</Text>
                <Text style={styles.value}>{fmtDate(data.fechaEmision)}</Text>
              </View>
            </View>
          </View>

          <View style={styles.footer}>
            <Text>
              Market Joyas SAC · Av. Ejemplo 123, Miraflores · Lima - Perú
            </Text>
            <Text>www.marketjoyas.com · +51 999 999 999</Text>
          </View>
        </View>
      </Page>
    </Document>
  );
}
