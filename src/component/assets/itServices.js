import itbg from '../../../public/it-servicesImages/itbg.jpg';
export const heroSectionData = {
    heading: "Cloud Services for Modern Businesses",
    desc: "With different cloud providers offering diverse solutions, businesses often find it challenging to choose the option that best-meets their requirement. As experts in cloud computing, we offer unbiased advise to our clients to zero-in on a solution that is best for them.",
    mobileBg:itbg,
    desktopBg:itbg
  };

  export const cloudServicesData = {
    heading:"Cloud Services for Modern Businesses",
    desc:"Begin your path to success with our expertly designed cloud services. Let us guide your business towards improved efficiency, scalability, and ongoing innovation, ensuring you stay ahead in today’s competitive landscape.",
    services:[ {
       id: 1,
       heading: "DevOps Consulting",
       description: `Bridge the gap between development and operations for faster, more reliable deployments.`,
     },
     {
       id: 2,
       heading: "CI/CD",
       description: `Automate your software delivery pipeline for quicker releases and fewer errors with Continuous Integration and Continuous Delivery services..`,
     },
     {
       id: 3,
       heading: "Cloud Strategy & Consulting",
       description: `Develop a winning cloud roadmap that aligns with your business goals with cloud strategy & consulting services..`,
     },
     {
       id: 4,
       heading: "Containerized Microservices",
       description: `Break down your applications into smaller, autonomous microservices for increased agility and scalability.`,
     },
     {
       id: 5,
       heading: "DevOps as a Service",
       description: `Get expert DevOps support without the need to build your own team with DevOps as a Service`,
     },
     {
       id: 6,
       heading: "24x7 Managed Services",
       description: `Enjoy peace of mind with around-the-clock monitoring and management of your cloud infrastructure.`,
     },
     {
       id: 7,
       heading: "Cloud FinOps Services",
       description: `Optimize your cloud spending and ensure you’re getting the most value out of your resources with Cloud FinOps services.`,
     },
     {
       id: 8,
       heading: "Proactive Issue Detection",
       description: `Identify and address potential problems before they impact your applications.`,
     },
     
   ]
 };  


 import aws from "../../../public/it-servicesImages/aws.png";
 import googleCloud from "../../../public/it-servicesImages/google-cloud.png";
 import microsoftAzure from "../../../public/it-servicesImages/microsoft-azure.png";


 export const cloudTechnologeisData ={
    heading:"Cloud We Work With",
    desc:"With different cloud providers offering diverse solutions, businesses often find it challenging to choose the option that best-meets their requirement. As experts in cloud computing, we offer unbiased advise to our clients to zero-in on a solution that is best for them.",
   technologies:[
    {
      id: 1,
      icon:aws,
      heading: "Amazon AWS",
      description: `The industry-leading cloud platform, AWS, is known for unmatched scalability and reliability.`,
    },
    {
      id: 2,
      icon:microsoftAzure,
      heading: "Microsoft Azure",
      description: `With comprehensive suite of Microsoft Azure cloud services, it lets you build and deploy cutting-edge applications.`,
    },
    {
      id: 3,
      icon:googleCloud,
      heading: "Google Cloud",
      description: `The open-source platform from Google comes with flexible scaling options and enables you to build & deploy next-gen apps.`,
    },
  ]} 
    

  export const faqData = [
    {
      question:
        "Why should I choose ValueCoders for software engineering, consulting, and outsourcing?",
      answer:
        "We are a highly experienced and qualified team of professionals with a proven track record of delivering quality software solutions to clients. Here are a few reasons to choose us:",
      list: [
        "675+ software developers",
        "Expertise in different technologies",
        "Strong reputation for quality work",
        "Experience working on complex projects for different industry verticals",
      ],
    },
    {
      question:
        "Can I test the services of ValueCoders before committing to long-term engagement?",
      answer: (
        <span>
          You can test the services of ValueCoders before committing to long-term
          engagement. We offer free trial to clients worldwide. This is to give
          our potential customers a risk-free way to try our software development
          services before committing to long-term engagement. We strongly believe
          in our products and services and want to allow everyone to experience
          firsthand the value we can bring. <br />
          <br /> Just fill out a form and{" "}
          <strong className="text-gray-900">connect with our team </strong>
          immediately. We hope you’ll take advantage of this and give us a chance
          to show you what we can do.
        </span>
      ),
    },
    {
      question: "How much does outsourcing software development to India cost?",
      answer: (
        <span>
          The cost of{" "}
          <strong className="text-gray-900">
            outsource software development{" "}
          </strong>{" "}
          depends on several factors such as the size and build of the
          application, the features & lightpurple-party integrations, APIs, animations,
          localizations, backend, cross-platform toolsets, platforms, etc. If you
          share your basic idea, we can provide you with an ETA and estimated
          cost.
        </span>
      ),
    },
    {
      question:
        "I own a digital agency. Do you offer white-label software development services?",
      answer: (
        <span>
          Yes, we provide all types of
          <strong className="text-gray-900">
            {" "}
            white-label software development services{" "}
          </strong>{" "}
          , including business-to-business (B2B), business-to-customer (B2C), and
          software-as-a-service (SaaS). Get in touch with our experts to know more
          about white-label software services. <br />
          <br />
          We believe in complete transparency and collaboration with our clients
          regarding white-label software development. We understand that every
          business has unique requirements and needs, and we work closely with our
          clients to ensure that we meet all their specific needs. We also offer
          24/7 support and maintenance services to ensure that our client’s
          businesses always run smoothly.
        </span>
      ),
    },
    {
      question: "Do you work with startups and clients on a budget?",
      answer: (
        <span>
          Yes, we work with startups. Since our establishment, we have worked with
          thousands of startups across the globe and become the proud partner in
          their success journey. We have built hundreds of Minimum Viable Products
          (MVPs) and scaled several startups to new heights. Also, we provide you
          with initial technology consulting that helps you cut costs & time.{" "}
          <br /> <br /> Let us know your budget, and our experts will be happy to
          help you.
        </span>
      ),
    },
    {
      question:
        "Is outsourcing software development risky? How do you ensure IP (Intellectual Property) and data protection?",
      answer: (
        <span>
          <strong className="text-gray-900">
            Software product development outsourcing
          </strong>{" "}
          is not risky at all if you outsource your project to a reputed company.
          ValueCoders ensures IP (Intellectual Property) & data protection in the
          following ways:
        </span>
      ),
      list: [
        "We sign a Non-Disclosure Agreement (NDA)",
        "We meet special industry regulations such as GDPR, HIPAA, etc.",
        "We follow secure coding and data protection practices",
        "We establish firewalls, encryption, and VPN services to prevent online security breaches",
        "All our employees are strictly verified before recruitment",
      ],
    },
    {
      question:
        "I want to outsource software development. What engagement options do you offer?",
      answer: (
        <span>
          At ValueCoders, we offer a variety of engagement models to suit your
          specific project requirements. Whether you need a dedicated team of
          coders for an ongoing project or just a few extra hands for a one-off
          task, we have an engagement model that will fit your needs.
          <br />
          <br />
          <strong className="text-gray-900">Dedicated Team:</strong>Dedicated team
          model comprises a PM, SW Engineer, QA Engineer, and other roles defined
          for each specific project.
          <br />
          <strong className="text-gray-900">Staff Augmentation: </strong>We
          provide extra talent to boost your specific projects. This extended team
          works as a part of your local team, attending your daily meetings and
          reporting directly to your manager.
          <br />
          <strong className="text-gray-900">
            Offshore Development Center:
          </strong>{" "}
          We also provide a dedicated software development office with all
          required infrastructure and employees in India. Our ODC model helps you
          save budget and speed up development, recruiting, and optimizing
          accounting and HR.
        </span>
      ),
    },
    {
      question: "How does the software development outsourcing process work?",
      answer:
        "Software development outsourcing works differently, depending on the project requirements and the company’s needs. But ‌the process typically looks something like this:",
      list: [
        "The company defines the project scope and objectives and finds a trustworthy provider.",
        "The provider creates a team of qualified professionals working on the project.",
        "The team works closely with the client to ensure all deliverables meet or exceed expectations.",
        "Upon completion, the client gives final approval and pays for the work completed.",
      ],
      paraAfterList: (
        <span>
          Each software development outsourcing project is unique, so this process
          will vary somewhat from case to case. <br /> <br /> It fulfills the
          requirement of a capable team cost-efficiently, and you get technical
          support after the experts complete the project.
        </span>
      ),
    },
    {
      question:
        "What are the advantages of outsourcing software development to India over Latin America, the Philippines or Eastern Europe?",
      answer: (
        <span>
          Many reasons make India an ideal destination for{" "}
          <strong className="text-gray-900">software outsourcing services</strong>
          . Here are a few reasons that give a competitive edge to India over
          Latin America, the Philippines, or Eastern Europe:
        </span>
      ),
      list: [
        "Outsourcing software development projects to India is always more cost-effective.",
        "You get a large pool of English-speaking skilled workforce in India, which might be a challenge in Eastern Europe and Philippines.",
        "Indian companies provide state-of-the-art infrastructural and technological support to the clients outsourcing to them.",
        "IT companies in India keep themselves abreast with the latest technological advancements.",
      ],
    },
  ];

  
  export const midBannerData1 = {
    heading: "Got a Project in Mind?",
    des: "Let's embark on a journey to transform your idea into a compelling digital presence.",
    button: "Get Started",
  };