import React from 'react';
import { Page, Text, View, Document, StyleSheet,pdf } from '@react-pdf/renderer';

// Define styles mimicking a professional and neat layout
const styles = StyleSheet.create({
  page: {
    padding: 40,
    fontFamily: 'Helvetica',
    fontSize: 12,
    color: '#333',
    lineHeight: 1.5,
  },
  header: {
    fontSize: 24,
    marginBottom: 20,
    textAlign: 'center',
    color: '#4A5568',
    fontWeight: 'bold',
  },
  section: {
    marginBottom: 20,
    paddingBottom: 10,
    borderBottom: '1px solid #E2E8F0',
  },
  row: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 8,
  },
  label: {
    fontWeight: 'bold',
    color: '#2D3748',
  },
  value: {
    color: '#4A5568',
  },
  table: {
    display: 'table',
    width: '100%',
    marginTop: 10,
  },
  tableHeader: {
    display: 'table-row',
    backgroundColor: '#EDF2F7',
    border: '1px solid #E2E8F0',
  },
  tableHeaderText: {
    padding: 8,
    fontWeight: 'bold',
    textAlign: 'left',
  },
  tableRow: {
    display: 'table-row',
  },
  tableCell: {
    padding: 8,
    border: '1px solid #E2E8F0',
    textAlign: 'left',
  },
  footer: {
    marginTop: 40,
    textAlign: 'center',
    fontSize: 10,
    color: '#718096',
  },
  footerText: {
    marginBottom: 5,
  },
});

// Create the Invoice PDF document component
const InvoiceDocument = ({ orderDetails }) => (
  <Document>
    <Page style={styles.page}>
      <Text style={styles.header}>Order Invoice</Text>

      {/* Order Details Section */}
      <View style={styles.section}>
        <View style={styles.row}>
          <Text style={styles.label}>Order ID:</Text>
          <Text style={styles.value}>{orderDetails.id}</Text>
        </View>
        <View style={styles.row}>
          <Text style={styles.label}>Customer ID:</Text>
          <Text style={styles.value}>{orderDetails.user}</Text>
        </View>
        <View style={styles.row}>
          <Text style={styles.label}>Order Date:</Text>
          <Text style={styles.value}>
            {new Date(orderDetails.order_date).toLocaleString()}
          </Text>
        </View>
        <View style={styles.row}>
          <Text style={styles.label}>Shipping Address:</Text>
          <Text style={styles.value}>{orderDetails.address}</Text>
        </View>
        <View style={styles.row}>
          <Text style={styles.label}>Total Amount:</Text>
          <Text style={styles.value}>{orderDetails.total_price} INR</Text>
        </View>
      </View>

      {/* Table for Order Items */}
      <View style={styles.table}>
        <View style={styles.tableHeader}>
          <Text style={styles.tableHeaderText}>Item</Text>
          <Text style={styles.tableHeaderText}>Quantity</Text>
          <Text style={styles.tableHeaderText}>Price (INR)</Text>
        </View>
        {orderDetails.order_items.map((item, index) => (
          <View style={styles.tableRow} key={index}>
            <Text style={styles.tableCell}>{item.product.name}</Text>
            <Text style={styles.tableCell}>{item.quantity}</Text>
            <Text style={styles.tableCell}>{item.product.price} INR</Text>
          </View>
        ))}
      </View>

      {/* Footer Section */}
      <View style={styles.footer}>
        <Text style={styles.footerText}>Powered by Lucida</Text>
        <Text>
          Lucida offers a seamless eCommerce experience with professional, high-quality service. 
          Thank you for choosing us for your online shopping!
        </Text>
      </View>
    </Page>
  </Document>
);
export const downloadInvoice = async (orderDetails) => {
  const blob = await pdf(
    <InvoiceDocument orderDetails={orderDetails} />
  ).toBlob();
  const url = URL.createObjectURL(blob);
  const link = document.createElement("a");
  link.href = url;
  link.download = `Invoice-${orderDetails.id}.pdf`;
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
  URL.revokeObjectURL(url);
};
