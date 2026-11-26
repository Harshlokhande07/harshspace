export type CertificateCategory =
  | 'hackathon'
  | 'certificate'
  | 'competition'
  | 'workshop'
  | 'technical'
  | 'college';

export interface Certificate {
  id: string;
  title: string;
  organization: string;
  date: string;
  description: string;
  category: CertificateCategory;
  image: string; // e.g. "/images/certificates/my-cert.jpg"
}

export const CERTIFICATES: Certificate[] = [
  {
    id: 'cert-1',
    title: '[SAMPLE - replace me] Hackathon Winner Award',
    organization: '[SAMPLE - replace me] Tech Innovation Hackathon',
    date: '[SAMPLE - replace me] 2024',
    description:
      '[SAMPLE - replace me] Awarded first place for developing an intelligent real-time crowd safety management system.',
    category: 'hackathon',
    image: '',
  },
  {
    id: 'cert-2',
    title: '[SAMPLE - replace me] Advanced Cloud Architecture Certification',
    organization: '[SAMPLE - replace me] Cloud Computing Institute',
    date: '[SAMPLE - replace me] 2024',
    description:
      '[SAMPLE - replace me] Comprehensive certification covering microservices, serverless systems, and containerized deployments.',
    category: 'certificate',
    image: '',
  },
  {
    id: 'cert-3',
    title: '[SAMPLE - replace me] National Coding Competition Finalist',
    organization: '[SAMPLE - replace me] Engineering Developer Association',
    date: '[SAMPLE - replace me] 2023',
    description:
      '[SAMPLE - replace me] Top finalist standing among nationwide participants solving complex algorithmic challenges.',
    category: 'competition',
    image: '',
  },
];
