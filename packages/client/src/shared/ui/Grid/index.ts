import Grid from './Grid';
import Row from './Row';
import Col from './Col';

/*
* стили стырил вот отсюда https://evgenyrodionov.github.io/flexboxgrid2/
* там документашка по всему функционалу, при использовании необходимо немного подкорректировать
*
*  Базовый пример
*     <Grid>
        <Row>
          <Col xs={6} sm={6} md={8} lg={10}>
            Hello world
          </Col>
        </Row>
      </Grid>
* Или вот такой
*     <Row>
        <Col xs={12} sm={3} md={2} lg={1} />
        <Col xs={6} sm={6} md={8} lg={10} />
        <Col xs={6} sm={3} md={2} lg={1} />
      </Row>
*
*
* Автоматическая ширина
*     <Row>
        <Col xs />
        <Col xs />
      </Row>
      <Row>
        <Col xs />
        <Col xs />
        <Col xs />
      </Row>
*
*
* Выравнивание
* Слева
*     <Row>
        <Col xs={12}>
          <Row start="xs">
            <Col xs={6} />
          </Row>
        </Col>
      <Row>
*
* По центру
*     <Row>
        <Col xs={12}>
          <Row center="xs">
            <Col xs={6} />
          </Row>
        </Col>
      <Row>
*
* Справа
*     <Row>
        <Col xs={12}>
          <Row end="xs">
            <Col xs={6} />
          </Row>
        </Col>
      <Row>
*
* Верх
*     <Row top="xs">
        <Col xs={6} />
        <Col xs={6} />
      <Row>
*
* Середина
*     <Row middle="xs">
        <Col xs={6} />
        <Col xs={6} />
      <Row>
*
* Низ
*     <Row bottom="xs">
        <Col xs={6} />
        <Col xs={6} />
      <Row>
*
* Around
*     <Row around="xs">
        <Col xs={2} />
        <Col xs={2} />
        <Col xs={2} />
      <Row>
*
* Between
*     <Row between="xs">
        <Col xs={2} />
        <Col xs={2} />
        <Col xs={2} />
      <Row>
* */

export {
    Grid,
    Row,
    Col,
};
