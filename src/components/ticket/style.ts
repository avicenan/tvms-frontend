import { StyleSheet } from "@react-pdf/renderer";

export const styles = StyleSheet.create({
  page: {
    flexDirection: "column",
    backgroundColor: "#FFFFFF",
    padding: 15,
    position: "relative",
    minHeight: "100%",
  },
  header: {
    marginBottom: 8,
    textAlign: "center",
  },
  title: {
    fontSize: 14,
    fontWeight: "bold",
    marginBottom: 4,
  },
  subtitle: {
    fontSize: 10,
    color: "#666666",
    marginBottom: 2,
  },
  section: {
    marginHorizontal: 24,
    marginVertical: 4,
    padding: 10,
    // borderBottom: "1px solid #EEEEEE",
  },
  groupSection: {
    marginHorizontal: 20,
    marginVertical: 10,
    padding: 4,
  },
  sectionTitle: {
    fontSize: 10,
    fontWeight: "bold",
    marginBottom: 4,
    color: "#333333",
  },
  greeting: {
    fontSize: 12,
    marginBottom: 4,
  },
  content: {
    fontSize: 12,
    lineHeight: 1.2,
  },
  row: {
    flexDirection: "row",
    marginBottom: 2,
  },
  label: {
    width: "40%",
    fontSize: 10,
    color: "#666666",
  },
  value: {
    width: "60%",
    fontSize: 10,
    color: "#333333",
  },
  evidenceContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginTop: 4,
    gap: 8,
  },
  evidenceImage: {
    flex: 1,
    alignItems: "center",
  },
  image: {
    width: "100%",
    height: 180,
    objectFit: "contain",
    marginBottom: 2,
  },
  imageCaption: {
    fontSize: 8,
    color: "#666666",
    textAlign: "center",
  },
  footer: {
    position: "absolute",
    bottom: 15,
    left: 15,
    right: 15,
    marginHorizontal: 20,
    paddingTop: 4,
    borderTop: "1px solid #EEEEEE",
    textAlign: "center",
  },
  footerText: {
    fontSize: 8,
    color: "#666666",
    marginBottom: 2,
  },
});
