import { Page, Text, View, Document, PDFViewer, Image } from "@react-pdf/renderer";
import { styles } from "./style";
import { TicketType } from "@/lib/types";

interface TicketProps {
  ticket: TicketType;
}

export default function Ticket({ ticket }: TicketProps) {
  const TicketPDF = () => (
    <Document>
      <Page size="A4" style={styles.page}>
        <View style={styles.header}>
          <Text style={styles.title}>KEPOLISIAN NEGARA</Text>
          <Text style={styles.subtitle}>DIREKTORAT LALU LINTAS</Text>
          <Text style={styles.subtitle}>SURAT TILANG ELEKTRONIK</Text>
          <Text style={styles.subtitle}>Nomor: {ticket?.id}</Text>
        </View>

        <View style={styles.section}>
          <Text style={styles.greeting}>
            Kepada Yth.{"\n"}
            Bapak/Ibu {ticket?.violation?.vehicle_data?.owner_name}
            {"\n"}
            Di Tempat
          </Text>

          <Text style={styles.content}>
            Dengan hormat,{"\n\n"}
            Berdasarkan hasil pemantauan kamera pengawas elektronik, dengan ini kami sampaikan bahwa kendaraan Anda terdeteksi telah melakukan pelanggaran lalu lintas dengan rincian sebagai berikut:
          </Text>
        </View>

        <View style={styles.groupSection}>
          <View style={styles.section}>
            <Text style={styles.sectionTitle}>BUKTI PELANGGARAN</Text>
            <View style={styles.evidenceContainer}>
              <View style={styles.evidenceImage}>
                <Image src={`https://placehold.co/600x400.jpg`} style={styles.image} cache={false} />
                <Text style={styles.imageCaption}>Foto Pelanggaran</Text>
              </View>
              <View style={styles.evidenceImage}>
                <Image src={`https://api.etilang.web.id/storage/${ticket?.violation?.number_evidence}`} style={styles.image} cache={false} />
                <Text style={styles.imageCaption}>Foto Plat Nomor</Text>
              </View>
            </View>
          </View>

          <View style={styles.section}>
            <Text style={styles.sectionTitle}>PELANGGARAN</Text>
            <View style={styles.row}>
              <Text style={styles.label}>Jenis Pelanggaran:</Text>
              <Text style={styles.value}>{ticket?.violation?.violation_type?.name}</Text>
            </View>
            <View style={styles.row}>
              <Text style={styles.label}>Tanggal Kejadian:</Text>
              <Text style={styles.value}>{new Date(ticket?.violation?.created_at!).toLocaleDateString("id-ID", { day: "2-digit", month: "2-digit", year: "numeric", hour: "2-digit", minute: "2-digit" })}</Text>
            </View>
            <View style={styles.row}>
              <Text style={styles.label}>Lokasi Kejadian:</Text>
              <Text style={styles.value}>{ticket?.violation?.camera?.location}</Text>
            </View>
          </View>

          <View style={styles.section}>
            <Text style={styles.sectionTitle}>KENDARAAN</Text>
            <View style={styles.row}>
              <Text style={styles.label}>Nomor Kendaraan:</Text>
              <Text style={styles.value}>{ticket?.violation?.vehicle_data?.number}</Text>
            </View>
            <View style={styles.row}>
              <Text style={styles.label}>Jenis Kendaraan:</Text>
              <Text style={styles.value}>
                {ticket?.violation?.vehicle_data?.category} - {ticket?.violation?.vehicle_data?.brand} {ticket?.violation?.vehicle_data?.type}
              </Text>
            </View>
            <View style={styles.row}>
              <Text style={styles.label}>Warna:</Text>
              <Text style={styles.value}>{ticket?.violation?.vehicle_data?.color}</Text>
            </View>
            <View style={styles.row}>
              <Text style={styles.label}>Pemilik:</Text>
              <Text style={styles.value}>{ticket?.violation?.vehicle_data?.owner_name}</Text>
            </View>
          </View>
        </View>

        <View style={styles.section}>
          <Text style={styles.content}>
            Berdasarkan pelanggaran tersebut di atas, Anda diharapkan untuk mengonfirmasi tilang dengan ketentuan yang berlaku atau menghadiri sidang di pengadilan sesuai jadwal yang akan ditetapkan.{"\n\n"}
            Demikian surat ini kami sampaikan. Atas perhatian dan kerjasamanya, kami ucapkan terima kasih.
          </Text>
        </View>

        <View style={styles.footer}>
          <Text style={styles.footerText}>Dokumen ini adalah bukti resmi surat tilang elektronik</Text>
          <Text style={styles.footerText}>Dicetak pada: {new Date().toLocaleString("id-ID")}</Text>
          {/* <Text style={styles.footerText}>
            Tertanda,{"\n"}Kepolisian Negara Republik Indonesia{"\n"}Direktorat Lalu Lintas Polda Metro Jaya
          </Text> */}
        </View>
      </Page>
    </Document>
  );

  return (
    <div className="w-full h-[calc(100vh-4rem)]">
      <PDFViewer width="100%" height="100%">
        <TicketPDF />
      </PDFViewer>
    </div>
  );
}
