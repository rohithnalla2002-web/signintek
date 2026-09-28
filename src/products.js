export const products = [
  {
    slug: 'chandhaplus',
    name: 'ChandhaPlus',
    mark: 'C+',
    index: '01',
    kicker: 'DONATION COLLECTION',
    tagline: 'Collect contributions with clarity.',
    summary: 'A donation collection platform for communities, campaigns, and organizations that need a simple, trustworthy way to receive and track giving.',
    lead: 'ChandhaPlus turns scattered contributions into one clear collection system — campaigns, donors, receipts, and progress in a single place.',
    audience: 'Temples, associations, nonprofits, community groups, and campaign organizers.',
    points: [
      { title: 'Campaign pages', text: 'Launch a cause with a goal, a story, and a live total people can trust.' },
      { title: 'Collection', text: 'Accept contributions and keep every gift tied to the right campaign.' },
      { title: 'Donor records', text: 'See who gave, when, and how much — without a separate spreadsheet.' },
      { title: 'Receipts', text: 'Send a clear confirmation so donors know their contribution landed.' },
    ],
    steps: ['Create a campaign', 'Share the collection link', 'Track gifts as they arrive', 'Close with a transparent total'],
  },
  {
    slug: 'thankuai',
    name: 'ThankuAI',
    mark: 'TA',
    index: '02',
    kicker: 'SMART AI',
    tagline: 'Answers, in the spirit of Perplexity.',
    summary: 'A smart AI assistant, like Perplexity. Ask in plain language and get a direct answer with the sources behind it.',
    lead: 'ThankuAI is built for people who want a useful answer, not a pile of links. Ask a question, follow up, and see where the answer came from.',
    audience: 'Teams, researchers, and operators who need fast, sourced answers.',
    points: [
      { title: 'Ask naturally', text: 'Type the question the way you would ask a colleague.' },
      { title: 'Sourced answers', text: 'Each response points back to the material it used.' },
      { title: 'Follow-ups', text: 'Stay in the thread and narrow the answer without starting over.' },
      { title: 'Work-ready', text: 'Use it for research, briefs, comparisons, and everyday decisions.' },
    ],
    steps: ['Ask a question', 'Read the answer and its sources', 'Follow up to go deeper', 'Take the result into your work'],
  },
  {
    slug: 'my-event-matrix',
    name: 'My Event Matrix',
    mark: 'EM',
    index: '03',
    kicker: 'EVENT SERVICE BOOKING',
    tagline: 'Book the services an event needs.',
    summary: 'An event service booking platform for hosts, venues, and vendors — packages, availability, and bookings in one flow.',
    lead: 'My Event Matrix connects people planning an event with the services that make it happen: venue, catering, production, and the rest of the lineup.',
    audience: 'Event hosts, planners, venues, and service vendors.',
    points: [
      { title: 'Service catalog', text: 'List what can be booked, with packages and clear details.' },
      { title: 'Availability', text: 'Show open dates so people book what is actually free.' },
      { title: 'Booking flow', text: 'Request, confirm, and keep the event details in one record.' },
      { title: 'For both sides', text: 'Hosts find services. Vendors manage incoming bookings.' },
    ],
    steps: ['Browse event services', 'Check dates and packages', 'Send a booking', 'Confirm and run the event'],
  },
]

export function getProduct(slug) {
  return products.find((product) => product.slug === slug)
}
