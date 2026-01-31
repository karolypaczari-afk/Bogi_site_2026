import React from 'react';

const StructuredData: React.FC = () => {
    const personSchema = {
        "@context": "https://schema.org",
        "@type": "Person",
        "name": "Boglarka Paczari Horvath",
        "alternateName": "Bogi Horvath",
        "jobTitle": "Senior Business Analyst & Digital Transformation Lead",
        "url": "https://bogihorvath.com",
        "image": "https://bogihorvath.com/bogi.png",
        "sameAs": [
            "https://www.linkedin.com/in/boglarka-paczari-horvath/"
        ],
        "description": "Senior Business Analyst & Digital Transformation Lead with 14+ years in global ICT operations, specializing in SAP S/4HANA, PEGA migrations, and Lean Six Sigma.",
        "knowsAbout": [
            "Business Analysis",
            "Digital Transformation",
            "Process Optimization",
            "Lean Six Sigma",
            "Change Management",
            "SAP S/4HANA",
            "PEGA",
            "Agile Project Management",
            "ITIL"
        ],
        "worksFor": [
            {
                "@type": "Organization",
                "name": "S.W.I.F.T."
            }
        ]
    };

    const websiteSchema = {
        "@context": "https://schema.org",
        "@type": "WebSite",
        "url": "https://bogihorvath.com",
        "name": "Bogi Horvath | Senior Business Analyst Portfolio",
        "description": "Professional portfolio of Bogi Horvath, Senior Business Analyst specializing in Digital Transformation and Process Excellence."
    };

    return (
        <>
            <script type="application/ld+json">
                {JSON.stringify(personSchema)}
            </script>
            <script type="application/ld+json">
                {JSON.stringify(websiteSchema)}
            </script>
        </>
    );
};

export default StructuredData;
