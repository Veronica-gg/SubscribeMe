import * as React from "react";
import { Card, Title, Paragraph } from "react-native-paper";
import { Col, Row, Grid } from "react-native-paper-grid";
import { StyleSheet } from "react-native";

const DetailCard = (props) => (
  <Card style={styles.container}>
    {/* <Card.Title
        title={props.titleID}
        subtitle="Card Subtitle"
        left={LeftContent}
      /> */}
    <Card.Content>
      <Row style={styles.rows}>
        <Col>
          <Title>Cost</Title>
        </Col>
        <Col style={styles.paragraphCol}>
          <Paragraph>${props.price}</Paragraph>
        </Col>
      </Row>
      <Row style={styles.rows}>
        <Col>
          <Title>Renewal Date</Title>
        </Col>
        <Col style={styles.paragraphCol}>
          <Paragraph>{props.date}</Paragraph>
        </Col>
      </Row>
      <Row style={styles.rows}>
        <Col>
          <Title>Type</Title>
        </Col>
        <Col style={styles.paragraphCol}>
          <Paragraph>{props.type}</Paragraph>
        </Col>
      </Row>
      <Row style={styles.rows}>
        <Col>
          <Title>Card</Title>
        </Col>
        <Col style={styles.paragraphCol}>
          <Paragraph>****</Paragraph>
        </Col>
      </Row>
      <Row style={styles.rows}>
        <Col>
          <Title>Friends</Title>
        </Col>
        <Col style={styles.paragraphCol}>
          <Paragraph>{props.friends}</Paragraph>
        </Col>
      </Row>
    </Card.Content>
    {/* <Card.Cover source={{ uri: "https://picsum.photos/700" }} /> */}
  </Card>
);

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    width: "90%",
  },
  rows: {
    alignItems: "center",
    justifyContent: "center",
  },
  paragraphCol: {
    alignItems: "center",
  },
});
export default DetailCard;
