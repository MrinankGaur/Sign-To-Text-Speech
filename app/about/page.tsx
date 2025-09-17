export default function AboutPage() {
    return (
      <main className="flex flex-col items-center p-4 sm:p-8 md:p-12">
        <div className="w-full max-w-4xl">
          <h1 className="text-4xl md:text-5xl font-extrabold mb-6 text-gray-900">About Us</h1>
          
          <div className="space-y-8 text-left text-lg text-gray-700">
            <section>
              <h2 className="text-2xl font-bold text-gray-800 mb-2">Our Mission</h2>
              <p>
                Our mission is to break down communication barriers and foster a more inclusive world. We believe that technology can be a powerful bridge, connecting the hearing-impaired community with the wider public through seamless, intuitive communication. The Sign-to-Speech Bridge is our first step towards a future where every voice, whether spoken or signed, can be heard and understood.
              </p>
            </section>
  
            <section>
              <h2 className="text-2xl font-bold text-gray-800 mb-2">The Challenge</h2>
              <p>
                Sign language is a rich and expressive form of communication, yet knowledge of it is uncommon in the general public. This creates a significant communication gap that can lead to social isolation and barriers in crucial areas like healthcare, education, and public services for the hearing- and speech-impaired community. While traditional solutions like human interpreters exist, they are not always accessible. Furthermore, previous technological approaches like computer-vision systems are often unreliable, being highly dependent on lighting, background conditions, and camera angles.
              </p>
            </section>
  
            <section>
              <h2 className="text-2xl font-bold text-gray-800 mb-2">Our Solution</h2>
              <p>
                The Sign-to-Speech Bridge is a comprehensive solution designed to overcome these challenges. It combines a lightweight, sensor-based smart glove with a powerful cloud-backed web application. The glove accurately captures the complex nuances of sign language gestures, which are then instantly translated into text and audible speech in multiple languages. Our system is portable, independent of environmental factors, and designed for real-world use, empowering users to communicate confidently and effectively in any setting.
              </p>
            </section>
  
            <section>
              <h2 className="text-2xl font-bold text-gray-800 mb-2">The Team</h2>
              <p>We are a team of dedicated student engineers passionate about leveraging technology for social good.</p>
              <ul className="list-disc list-inside mt-2">
                <li>Sujal Kumar Khandelwal (22BEC1209)</li>
                <li>Mrinank Gaur (22BEC1258)</li>
                <li>Kalyanam Karthik (22BEC1268)</li>
              </ul>
              <p className="mt-2">This project is developed under the expert guidance of <strong>Dr. Velmathi G</strong>.</p>
            </section>
          </div>
        </div>
      </main>
    );
  }