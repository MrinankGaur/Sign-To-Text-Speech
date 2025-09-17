import Image from 'next/image'; // Import the Next.js Image component

export default function TechnologyPage() {
  return (
    <main className="flex flex-col items-center p-4 sm:p-8 md:p-12">
      <div className="w-full max-w-4xl">
        <h1 className="text-4xl md:text-5xl font-extrabold mb-6 text-gray-900">Our Technology</h1>
        
        <div className="space-y-8 text-left text-lg text-gray-700">
          <p>Our platform is built on a sophisticated pipeline that transforms physical gestures into multilingual speech in real time. The system is divided into two core components: the hardware-driven Smart Glove and the software-driven Recognition & Translation Engine.</p>

          <section>
            <h2 className="text-2xl font-bold text-gray-800 mb-4">Hardware: The Smart Glove</h2>
            
            {/* --- IMAGE OF THE GLOVE ADDED HERE --- */}
            <div className="my-6 flex justify-center p-4 bg-gray-100 rounded-xl border">
              <Image
                src="/glove.png"
                alt="The Sign-to-Speech Smart Glove prototype"
                width={550}
                height={400}
                className="rounded-lg shadow-md object-contain"
                priority
              />
            </div>
            {/* --- END OF IMAGE SECTION --- */}

            <p>The ergonomic, non-intrusive glove is the heart of our data acquisition system. It is embedded with a fusion of sensors designed to capture hand and finger movements with high fidelity.</p>
            <ul className="list-disc list-inside mt-4 space-y-2">
              <li><strong>Flex Sensors:</strong> Five flex sensors are strategically placed along the fingers to measure the degree of bend and flexion, which is crucial for determining handshapes.</li>
              <li><strong>Inertial Measurement Units (IMUs):</strong> A 6-axis IMU, comprising an accelerometer and a gyroscope, captures the hand's orientation, motion, and trajectory. This allows the system to understand dynamic gestures that involve movement through space, not just static handshapes.</li>
              <li><strong>Pressure Sensors:</strong> To enhance accuracy and resolve ambiguity between signs with similar flexion patterns (like 'R', 'U', and 'V'), pressure sensors are used to detect when and where fingers make contact with each other or the palm.</li>
              <li><strong>Microcontroller Unit (MCU):</strong> An onboard MCU collects and synchronizes the data from all sensors, preparing it for the recognition engine.</li>
            </ul>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-gray-800 mb-2">Software: Recognition & Translation Engine</h2>
            <p>The raw data from the glove is processed through a multi-stage software pipeline to achieve accurate, real-time results.</p>
            <ol className="list-decimal list-inside mt-4 space-y-2">
              <li><strong>Data Preprocessing:</strong> Raw sensor data is filtered to remove noise and normalized to account for variations in hand sizes and gesture speeds across different users.</li>
              <li><strong>Feature Extraction:</strong> The system computes statistical features from the sensor data streams to create a compact yet descriptive feature vector that represents the gesture.</li>
              <li><strong>Gesture Recognition (Machine Learning):</strong> At the core of our system is a powerful prediction model. We utilize advanced algorithms, such as Support Vector Machines (SVM) and Recurrent Neural Networks (RNN-LSTM), to classify gestures with high precision.</li>
              <li><strong>Cloud-Powered Web Application:</strong> The recognized text is relayed to our web interface, which leverages official Google Cloud APIs for the final translation and speech synthesis using a modern frontend built with Next.js and React.</li>
            </ol>
          </section>
        </div>
      </div>
    </main>
  );
}