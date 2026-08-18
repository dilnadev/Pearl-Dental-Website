import { ServiceItem, Doctor, Testimonial } from './types';
import dentalImplantImage from './assets/dental-implant.png';
import digitalSmileImage from './assets/digital smile.png';

export const TECH_IMAGE = digitalSmileImage;

export const SERVICES: ServiceItem[] = [
  {
    id: "invisalign",
    title: "Invisalign & Braces",
    shortDesc: "Achieve your perfect smile discreetly with the world's most advanced clear aligner system. Expertly managed by Dr. Joseph Sunny.",
    fullDesc: "Invisalign treatment uses a series of virtually invisible, removable, and comfortable aligners custom-made using 3D intraoral digital scans. Designed for teens and adults seeking discreet, precise orthodontic correction.",
    icon: "play_apps",
    image: "https://lh3.googleusercontent.com/aida-public/AB6AXuDl9WIALDWwE8RU_OcMd9O2RHn1BK7Z1bbjGtvpu7wvhRReZx81z4alcikvli4nBAMRzOjSllolZMwRKxXClJOIJHJvXaAzUtizcwJIr_iraiDNPf3qK14elDpX4y1npm8Oqi3Rbi9AYl7F_G5SXNmo3SY6IHtCg4l3s7AlOt7FDZPmUNKiil2hMkWjRsWx-d7iEFuMzHblEics_GBlbm2YV20PjndLrTY4DAVV98R_9DidQ4LouK-65SisLidjOl3dBVDmvOhiZDrt",
    category: "Orthodontics",
    duration: "6 - 18 Months",
    priceEstimate: "Consultation required for custom plan",
    benefits: [
      "Nearly invisible clear aligners",
      "Removable for eating & brushing",
      "3D iTero digital smile simulation prior to starting",
      "Fewer in-clinic visits needed"
    ],
    faqs: [
      {
        question: "How long do I need to wear aligners each day?",
        answer: "Aligners should be worn 20 to 22 hours per day for optimal results, removing them only to eat, drink non-water liquids, and brush."
      },
      {
        question: "Is Invisalign painful?",
        answer: "Most patients experience slight pressure for a day or two when changing to a new set of aligners, which is a normal sign that teeth are moving safely."
      }
    ]
  },
  {
    id: "implants",
    title: "Dental Implants",
    shortDesc: "Permanent, natural-looking solutions for missing teeth using biocompatible titanium and ceramic.",
    fullDesc: "Dental implants provide a permanent, structural replacement for missing teeth. Titanium posts integrate directly with the jawbone, acting as artificial roots topped with durable, aesthetic ceramic crowns.",
    icon: "health_and_safety",
    image: dentalImplantImage,
    category: "Restorative Dentistry",
    duration: "2 - 3 Visits over 3 months",
    priceEstimate: "Custom based on single or full arch",
    benefits: [
      "Looks and functions like natural teeth",
      "Prevents bone loss in the jaw",
      "High success rate (98%+)",
      "Does not alter surrounding healthy teeth"
    ],
    faqs: [
      {
        question: "Are dental implants permanent?",
        answer: "Yes! With proper oral hygiene and regular checkups, dental implants can last a lifetime."
      }
    ]
  },
  {
    id: "root-canal",
    title: "Root Canal Treatment",
    shortDesc: "Pain-free endodontic treatments using advanced rotary files and microscopes.",
    fullDesc: "Modern root canal treatment preserves natural teeth affected by deep decay or infection. Using ultra-precise microscopic rotary instruments and local anesthesia, the procedure is completely pain-free.",
    icon: "medical_services",
    image: "https://lh3.googleusercontent.com/aida-public/AB6AXuBLjmNPQMXTABEXId8pw9zlrmEsHTqhaNpeOPfYCoEc93gNAaNHcj3lrYa3grgw_Jn3tnbDj7lSEex1_Y12Ep5_r6s82vYGfygimB9SGbvMY5LyLFYReKs-w180Kc6fAf86JF_1c8aMps1D2NET9D_PSdSuvaJ18R9MzZe_6vxlYX59yb7-6zZZwk1_VhVTZj9gsuoF27uozOec-XVceoV2qgp-AcbSjHxCtptLn4axozXn064TkVaHTFwM40d3NUMKYMABNPIgaehx",
    category: "Endodontics",
    duration: "1 - 2 Single-sitting sessions",
    priceEstimate: "Affordable preservation care",
    benefits: [
      "100% painless procedure with modern anesthesia",
      "Saves natural tooth structure",
      "Single-visit options available",
      "Prevents spread of dental infection"
    ],
    faqs: [
      {
        question: "Does a root canal hurt?",
        answer: "No. With modern local anesthesia and rotary tools, patients report no more discomfort than getting a standard filling."
      }
    ]
  },
  {
    id: "smile-design",
    title: "Smile Designing",
    shortDesc: "Digital smile design to visualize and create your most aesthetic version.",
    fullDesc: "Digital Smile Design (DSD) uses 3D photography, intraoral scans, and computer modeling to craft a custom aesthetic smile blueprint aligned with your facial symmetry and preferences.",
    icon: "auto_awesome",
    image: digitalSmileImage,
    category: "Cosmetic Dentistry",
    duration: "1 - 2 Weeks complete makeover",
    priceEstimate: "Tailored to veneers or aligners",
    benefits: [
      "Preview your new smile on screen before treatment starts",
      "Customized porcelain veneers or bonding",
      "Harmonized with facial proportions",
      "Boosts confidence instantly"
    ],
    faqs: [
      {
        question: "Can I see the final result before starting?",
        answer: "Yes! Digital Smile Design allows us to generate a full 3D mock-up for your review and approval before any procedure begins."
      }
    ]
  },
  {
    id: "pediatric-care",
    title: "Pediatric Care",
    shortDesc: "Gentle and fun dental experiences for our youngest patients to build healthy habits.",
    fullDesc: "We provide child-friendly dental care in a warm, welcoming environment. From routine cavity prevention and fluoride treatments to early interceptive orthodontics.",
    icon: "child_care",
    image: "https://lh3.googleusercontent.com/aida-public/AB6AXuDxaA8cx1GJ3ko0adyuJMVqZ1_J2ji8C9vGn1MrUNAHD9V2zvmRizOcq15qP_pl69TjEbC81II2143OO84IxkLC-qWSgmz7Ijjppg7px4zR64RuuF7vom-gS3Z924XRTK8szMPmlhik6S-kev2VFcS9EIExBo2xWufTjyb1JGsc1PoMsTgKtL45KfTDs9Mt8SiiQs-1qmzK3zyO1L91TDsVi5Avj8eZnYVZumXYh3ygHmow-qlck6RH9kAqgiWi6o8KK9Mb5BqCKtfu",
    category: "Pediatric Dentistry",
    duration: "30 - 45 Minutes",
    priceEstimate: "Routine preventive care",
    benefits: [
      "Fear-free, compassionate environment",
      "Fluoride varnish & dental sealants",
      "Habit correction guidance (thumb sucking, mouth breathing)",
      "Interactive dental education for kids"
    ],
    faqs: [
      {
        question: "When should a child first visit the dentist?",
        answer: "The ideal time for a child's first dental visit is when their first tooth appears or by their first birthday."
      }
    ]
  }
];

export const DOCTORS: Doctor[] = [
  {
    id: "dr-joseph-sunny",
    name: "Dr. Joseph Sunny",
    title: "Invisalign & Orthodontic Specialist",
    role: "Lead Orthodontist & Clinical Director",
    bio: "Leading expert in invisible orthodontics since 2016, dedicated to precision-driven smile transformations.",
    fullBio: "Dr. Joseph Sunny is an acclaimed Orthodontist renowned for introducing advanced clear aligner protocols in Kochi. Having successfully treated over 1,500+ complex Invisalign cases, Dr. Sunny combines digital smile technology with biomechanical precision to deliver flawless, lasting smiles.",
    experienceYears: 10,
    specializations: [
      "Invisalign Aligner Therapy",
      "Digital Smile Design",
      "Complex Orthodontics",
      "Surgical Orthodontics"
    ],
    education: [
      "MDS in Orthodontics & Dentofacial Orthopedics",
      "Certified Diamond Provider - Invisalign System",
      "Fellowship in Digital Smile Design (DSD)"
    ],
    avatar: "https://lh3.googleusercontent.com/aida-public/AB6AXuAyElvBLBq5NlNhKKeUP3EhXBVvbNBM0GNg7iIZWCwNDXg7FdhAvmSja2kyCdZwK2GaiFCU09SnF6wCkdgBSwebXCNhoK_nUrlsxjG98JYkC8ijqMogoNcHBTQrEe_OVFfTzSWjW3iPngKCG0LoNtXwCEb2k3JZclSONbUIEaw4rZzpLcmPQzEN0Md1MTzMRVBgjB4ysrEwz8njKUTdHOcmSQrQwkF-zMnr2Dukejg5Z996xehpzF-zjntQCO0f1KSQltXo7ySvxAHS",
    availableDays: ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"]
  },
  {
    id: "dr-monicca-rose",
    name: "Dr. Monicca Rose",
    title: "Senior Dental Surgeon",
    role: "Dental Implant Specialist & Cosmetic Surgeon",
    bio: "Specialist in restorative and painless surgical procedures with a focus on patient comfort and long-term results.",
    fullBio: "Dr. Monicca Rose brings exceptional surgical finesse and compassionate care to Pearl Dental Care. She specializes in full-mouth rehabilitate implantology, painless root canals, and cosmetic dental restorations.",
    experienceYears: 8,
    specializations: [
      "Dental Implantology",
      "Painless Oral Surgery",
      "Porcelain Veneers & Crowns",
      "Restorative Dentistry"
    ],
    education: [
      "MDS in Prosthodontics & Implantology",
      "Advanced Training in Laser Dentistry",
      "Member of International Team for Implantology (ITI)"
    ],
    avatar: "https://lh3.googleusercontent.com/aida-public/AB6AXuBBtgUfYFKIPUA-IMmIfWpOv6EtTxtA9TXrdmuTcXH5f4uCQM90x3dfOkRtvceqQ-crKtx3VCtt50gGyAemKw6eANDoLHDQHUXXMXP0sYLpz-c-qpbUHRYBxlCy92pRD59K0MADJE312xB1Cc8LQgRT0_Yb5X8-MW0F8h2ANCmUWpiH5GZDma4KGesgksxeQgrcc4Frt7_JHKl7WBrqocQe6u9YUjhPB1IpUFHUnnZmUvhKn2WoDf9mVmqFPAZElt0GTg-lc0gkShRT",
    availableDays: ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"]
  }
];

export const INITIAL_TESTIMONIALS: Testimonial[] = [
  {
    id: "1",
    author: "Elisha P",
    location: "New Zealand",
    text: "I came from New Zealand for four wisdom teeth extractions and Invisalign. Dr Sunny and his team were very experienced and professional. Highly recommend!",
    rating: 5,
    date: "Recent Patient",
    treatment: "Invisalign & Extractions"
  },
  {
    id: "2",
    author: "Tarus Mamachan",
    location: "Patient Review",
    text: "Dr. Joseph Sunny is a true professional. He explained the procedures in layman's terms. The clinic is incredibly clean which is very important to me.",
    rating: 5,
    date: "Verified Visit",
    treatment: "Orthodontic Care"
  },
  {
    id: "3",
    author: "Laya Shaheen",
    location: "Patient Review",
    text: "I completed my Invisalign treatment and am extremely satisfied. Dr. Sunny stands out for his attention to detail and perfectionism.",
    rating: 5,
    date: "Verified Visit",
    treatment: "Invisalign Transformation"
  },
  {
    id: "4",
    author: "Anand Nair",
    location: "Kochi, Kerala",
    text: "Got two dental implants done by Dr. Monicca Rose. Absolutely zero pain during or after the procedure. World-class technology and super friendly staff!",
    rating: 5,
    date: "1 month ago",
    treatment: "Dental Implants"
  }
];

export const CLINIC_INFO = {
  name: "Pearl Dental Care",
  tagline: "Modern Care, Radiant Smiles",
  address: "Metro pillar no 596, Opp. PVS hospital, Kaloor, Kochi, Kerala 682017",
  phone: "+91 9497343412",
  email: "care@pearldentalcare.com",
  hoursWeekdays: "9:30am - 7:00pm",
  hoursSunday: "Appointment Only",
  emergencyPhone: "+91 9497343412"
};
