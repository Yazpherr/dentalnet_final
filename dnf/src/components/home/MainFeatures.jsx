import { useEffect } from 'react';
import { Card, Row, Col } from 'antd';
import { SmileOutlined, HeartOutlined, SafetyOutlined, MedicineBoxOutlined, ClockCircleOutlined, UserOutlined } from '@ant-design/icons';
import AOS from 'aos';
import 'aos/dist/aos.css';

const { Meta } = Card;

const MainFeatures = () => {
  useEffect(() => {
    AOS.init({ duration: 500 }); // Medio segundo de duración
  }, []);

  return (
    <section className="bg-gray-100 py-20">
      <div className="container mx-auto max-w-screen-xl px-4">
        <div className="flex flex-col md:flex-row items-center mb-12">
          {/* Título Dividido en Dos Columnas */}
          <div className="w-full md:w-1/2">
            <div className="md:flex md:space-x-4">
              <h2 className="text-4xl font-bold text-gray-900 mb-2 text-center md:text-left md:w-1/2">¿Qué nos hace especiales?</h2>
            </div>
          </div>

          <h2 className="text-4xl font-bold md:w-1/2 text-right">
            Características principales
          </h2>
        </div>

        {/* Seis Tarjetas */}
        <Row gutter={[16, 16]} justify="center">
          {/* Tarjeta 1 */}
          <Col xs={24} md={12} lg={8}>
            <Card
              data-aos="fade-up"
              className="rounded-lg shadow-lg h-full flex flex-col justify-center items-center text-center"
              style={{ height: '100%' }}
            >
              <SmileOutlined style={{ fontSize: '3rem', color: '#003399', marginBottom: '1rem' }} />
              <Meta
                title={<h1 className="text-xl font-bold">Tecnología Láser</h1>}
                description="Nuestro centro dental cuenta con la tecnología láser más avanzada del mercado, lo que nos permite ofrecer tratamientos precisos y eficaces para su boca."
              />
            </Card>
          </Col>
          {/* Tarjeta 2 */}
          <Col xs={24} md={12} lg={8}>
            <Card
              data-aos="fade-up"
              className="rounded-lg shadow-lg h-full flex flex-col justify-center items-center text-center"
              style={{ height: '100%' }}
            >
              <HeartOutlined style={{ fontSize: '3rem', color: '#003399', marginBottom: '1rem' }} />
              <Meta
                title={<h1 className="text-xl font-bold">Cuidado Integral</h1>}
                description="Ofrecemos un cuidado dental integral que abarca desde la prevención hasta los tratamientos más avanzados."
              />
            </Card>
          </Col>
          {/* Tarjeta 3 */}
          <Col xs={24} md={12} lg={8}>
            <Card
              data-aos="fade-up"
              className="rounded-lg shadow-lg h-full flex flex-col justify-center items-center text-center"
              style={{ height: '100%' }}
            >
              <SafetyOutlined style={{ fontSize: '3rem', color: '#003399', marginBottom: '1rem' }} />
              <Meta
                title={<h1 className="text-xl font-bold">Seguridad</h1>}
                description="Garantizamos los más altos estándares de seguridad e higiene en todos nuestros procedimientos."
              />
            </Card>
          </Col>
          {/* Tarjeta 4 */}
          <Col xs={24} md={12} lg={8}>
            <Card
              data-aos="fade-up"
              className="rounded-lg shadow-lg h-full flex flex-col justify-center items-center text-center"
              style={{ height: '100%' }}
            >
              <MedicineBoxOutlined style={{ fontSize: '3rem', color: '#003399', marginBottom: '1rem' }} />
              <Meta
                title={<h1 className="text-xl font-bold">Tratamientos Especializados</h1>}
                description="Contamos con un equipo de especialistas en todas las áreas de la odontología para brindarte el mejor tratamiento."
              />
            </Card>
          </Col>
          {/* Tarjeta 5 */}
          <Col xs={24} md={12} lg={8}>
            <Card
              data-aos="fade-up"
              className="rounded-lg shadow-lg h-full flex flex-col justify-center items-center text-center"
              style={{ height: '100%' }}
            >
              <ClockCircleOutlined style={{ fontSize: '3rem', color: '#003399', marginBottom: '1rem' }} />
              <Meta
                title={<h1 className="text-xl font-bold">Horarios Flexibles</h1>}
                description="Ofrecemos horarios flexibles para que puedas agendar tus citas en el momento que más te convenga."
              />
            </Card>
          </Col>
          {/* Tarjeta 6 */}
          <Col xs={24} md={12} lg={8}>
            <Card
              data-aos="fade-up"
              className="rounded-lg shadow-lg h-full flex flex-col justify-center items-center text-center"
              style={{ height: '100%' }}
            >
              <UserOutlined style={{ fontSize: '3rem', color: '#003399', marginBottom: '1rem' }} />
              <Meta
                title={<h1 className="text-xl font-bold">Atención Personalizada</h1>}
                description="Nos enfocamos en brindar una atención personalizada a cada uno de nuestros pacientes, asegurándonos de satisfacer todas sus necesidades."
              />
            </Card>
          </Col>
        </Row>
      </div>
    </section>
  );
}

export default MainFeatures;
