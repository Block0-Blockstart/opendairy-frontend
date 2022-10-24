import { DocumentType, DRStatus } from './enums';
import { createTable, fakeHash } from './helpers';
import { schemaDR } from './schemas';

export const users = [
  { id: 0, name: 'Ian', ethAccount: { address: '', pubKey: '' } },
  { id: 1, name: 'Kim', ethAccount: { address: '', pubKey: '' } },
  { id: 2, name: 'Eileen', ethAccount: { address: '', pubKey: '' } },
  { id: 3, name: 'Michael', ethAccount: { address: '', pubKey: '' } },
  { id: 4, name: 'Louis', ethAccount: { address: '', pubKey: '' } },
  { id: 5, name: 'Hans', ethAccount: { address: '', pubKey: '' } },
  { id: 6, name: 'Geert', ethAccount: { address: '', pubKey: '' } },
  { id: 7, name: 'Margot', ethAccount: { address: '', pubKey: '' } },
  { id: 8, name: 'Tom', ethAccount: { address: '', pubKey: '' } },
  { id: 9, name: 'Henry', ethAccount: { address: '', pubKey: '' } },
  { id: 10, name: 'Mike', ethAccount: { address: '', pubKey: '' } },
  { id: 11, name: 'John', ethAccount: { address: '', pubKey: '' } },
  { id: 12, name: 'Anna', ethAccount: { address: '', pubKey: '' } },
  { id: 13, name: 'Lance', ethAccount: { address: '', pubKey: '' } },
];

/* *********************************** *
 * GET deals
 * *********************************** */

/* eslint-disable prettier/prettier */
export const deals = [
  ['deal-0b574560',		'1655330400000',		'To be produced offer bundle',		'Butter Unsalted Sweet Cream',	'180 mt',		'1660514400000',	'6200 /mt'],
  ['deal-1ee803a1',		'1655157600000',		'Already produced offer',					'Butter Unsalted Sweet Cream',	'150 mt',		'1660514400000',	'6500 /mt'],
  ['deal-2e5813a2',		'1654725600000',		'To be produced offer bundle',		'SMP HHHS',											'500 mt',		'1659304800000',	'5500 /mt'],
  ['deal-3e5803a3',		'1654639200000',		'To be produced offer bundle',		'SMP HHHS, MH',									'2000 mt',	'1659304800000',	'2500 /mt'],
  ['deal-4e5803a4',		'1654293600000',		'Already produced offer',					'BMP MH',												'120 mt',		'1659304800000',	'3800 /mt'],
  ['deal-5e5803a5',		'1654034400000',		'Already produced offer',					'SMP MH',												'500 mt',		'1656626400000',	'3600 /mt'],
  ['deal-6e5803a6',		'1653084000000',		'To be produced offer bundle',		'SMP MH',												'240 mt',		'1656626400000',	'6600 /mt'],
  ['deal-7e5803a7',		'1652911200000',		'Already produced offer',					'Butter Unsalted Sweet Cream',	'120.4 mt',	'1656626400000',	'6500 /mt'],
];

/* *********************************** *
 * GET documentrequests/:dealId
 * *********************************** */

// ORDER MATTERS : id, requestDate, requestedBy, requestedTo, deadline, documentType, status, lastRejectedReason, contractDR
export const DRs = [
  ['dr-0b57456e',		'1655935200000',		users[0].name,		users[11].name,		'1656885600000',		DocumentType.INVOICE,					DRStatus.NEW,					'', '0xe540204af3A5d77419552B35aEaD5453a477A7da'],
  ['dr-1ee803ab',		'1652133600000',		users[0].name,		users[12].name,		'1653084000000',		DocumentType.COA,							DRStatus.UPDATE,			'Missing signature on page 2', '0xe540204af3A5d77419552B35aEaD5453a477A7da'],
  ['dr-2e5813ac',		'1650060000000',		users[0].name,		users[10].name,		'1651269600000',		DocumentType.COO,							DRStatus.NEW,					'', '0xe540204af3A5d77419552B35aEaD5453a477A7da'],
  ['dr-3e5803ad',		'1653084000000',		users[0].name,		users[11].name,		'1654898400000',		DocumentType.MSDS,						DRStatus.ACCEPTED,		'Annex 3 is incomplete', '0xe540204af3A5d77419552B35aEaD5453a477A7da'],
  ['dr-4e5803ae',		'1652047200000',		users[0].name,		users[11].name,		'1653516000000',		DocumentType.BILL_OF_LADING,	DRStatus.UPDATE,			'Departure date is wrong', '0xe540204af3A5d77419552B35aEaD5453a477A7da'],
  ['dr-5e5803ae',		'1654898400000',		users[0].name,		users[10].name,		'1656540000000',		DocumentType.MSDS,						DRStatus.UPDATE,			'Page 51 must be signed by empowered person only', '0xe540204af3A5d77419552B35aEaD5453a477A7da'],
  ['dr-6e5803af',		'1651615200000',		users[0].name,		users[13].name,		'1653516000000',		DocumentType.BILL_OF_LADING,	DRStatus.REJECTED,		'', '0xe540204af3A5d77419552B35aEaD5453a477A7da'],
  ['dr-7e5803aa',		'1654380000000',		users[0].name,		users[9].name,		'1656108000000',		DocumentType.BILL_OF_LADING,	DRStatus.NEW,					'', '0xe540204af3A5d77419552B35aEaD5453a477A7da'],
  ['dr-0a07450e',		'1656108000000',		users[1].name,		users[0].name,		'1656972000000',		DocumentType.INVOICE,					DRStatus.REJECTED,		'', '0xe540204af3A5d77419552B35aEaD5453a477A7da'],
  ['dr-1b18031b',		'1652047200000',		users[2].name,		users[0].name,		'1653084000000',		DocumentType.COA,							DRStatus.NEW,					'', '0xe540204af3A5d77419552B35aEaD5453a477A7da'],
  ['dr-2c28132c',		'1649714400000',		users[3].name,		users[0].name,		'1651269600000',		DocumentType.COO,							DRStatus.NEW,					'', '0xe540204af3A5d77419552B35aEaD5453a477A7da'],
  ['dr-3d38033d',		'1653084000000',		users[4].name,		users[0].name,		'1654898400000',		DocumentType.MSDS,						DRStatus.NEW,					'', '0xe540204af3A5d77419552B35aEaD5453a477A7da'],
  ['dr-4e48034e',		'1652133600000',		users[1].name,		users[0].name,		'1653516000000',		DocumentType.BILL_OF_LADING,	DRStatus.UPDATE,			'Missing transport company VAT number', '0xe540204af3A5d77419552B35aEaD5453a477A7da'],
  ['dr-5f58035e',		'1654898400000',		users[5].name,		users[0].name,		'1656540000000',		DocumentType.HALAL,						DRStatus.UPDATE,			'Certificate is out of date', '0xe540204af3A5d77419552B35aEaD5453a477A7da'],
  ['dr-6a68036f',		'1651615200000',		users[2].name,		users[0].name,		'1653429600000',		DocumentType.EUR1,						DRStatus.NEW,					'', '0xe540204af3A5d77419552B35aEaD5453a477A7da'],
  ['dr-7b78037a',		'1654380000000',		users[2].name,		users[0].name,		'1656108000000',		DocumentType.IMPORT_PERMIT,		DRStatus.ACCEPTED,		'', '0xe540204af3A5d77419552B35aEaD5453a477A7da'],
];

/* *********************************** *
 * this table is not delivered through API, see join tables below
 * *********************************** */

// ORDER MATTERS : id, idDR, sentDate, sender, receiver, verificationHash, txHash
export const DDs = [
  ['dd-0a07450e',				'dr-0e074501',		'1656108000000',		users[11].name,		users[0].name,		fakeHash(),		'0x0af0165ac6660fc25e991aa6cba90de86661bfa98fc5c9f88e8aedb750ca431a'],
  ['dd-1a08031b',				'dr-1e180312',		'1652047200000',		users[12].name,		users[0].name,		fakeHash(),		'0x1af0165ac6660fc25e991aa6cba90de86661bfa98fc5c9f88e8aedb750ca432b'],
  ['dd-2a08132c',				'dr-2e281323',		'1649714400000',		users[10].name,		users[0].name,		fakeHash(),		'0x2af0165ac6660fc25e991aa6cba90de86661bfa98fc5c9f88e8aedb750ca433c'],
  ['dd-3a08033d',				'dr-3e380334',		'1653084000000',		users[11].name,		users[0].name,		fakeHash(),		'0x3af0165ac6660fc25e991aa6cba90de86661bfa98fc5c9f88e8aedb750ca434d'],
  ['dd-4a08034e',				'dr-4e480345',		'1652133600000',		users[11].name,		users[0].name,		fakeHash(),		'0x4af0165ac6660fc25e991aa6cba90de86661bfa98fc5c9f88e8aedb750ca435e'],
  ['dd-5a08035e',				'dr-5e580356',		'1654898400000',		users[10].name,		users[0].name,		fakeHash(),		'0x5af0165ac6660fc25e991aa6cba90de86661bfa98fc5c9f88e8aedb750ca436f'],
  ['dd-6a08036f',				'dr-6e680367',		'1651615200000',		users[13].name,		users[0].name,		fakeHash(),		'0x6af0165ac6660fc25e991aa6cba90de86661bfa98fc5c9f88e8aedb750ca437a'],
  ['dd-7a08037a',				'dr-7e780378',		'1654380000000',		users[9].name,		users[0].name,		fakeHash(),		'0x7af0165ac6660fc25e991aa6cba90de86661bfa98fc5c9f88e8aedb750ca438b'],
  ['dd-0b57450e',				'dr-0fa74501',		'1655935200000',		users[0].name,		users[1].name,		fakeHash(),		'0x0fbc164ac6660fc25e991aa6cba90de86661bfa98fc5c9f88e8aedb750ca431a'],
  ['dd-1b58031b',				'dr-1fa80312',		'1652133600000',		users[0].name,		users[2].name,		fakeHash(),		'0x1fbc164ac6660fc25e991aa6cba90de86661bfa98fc5c9f88e8aedb750ca432b'],
  ['dd-2b58132c',				'dr-2fa81323',		'1650060000000',		users[0].name,		users[3].name,		fakeHash(),		'0x2fbc164ac6660fc25e991aa6cba90de86661bfa98fc5c9f88e8aedb750ca433c'],
  ['dd-3b58033d',				'dr-3fa80334',		'1653084000000',		users[0].name,		users[4].name,		fakeHash(),		'0x3fbc164ac6660fc25e991aa6cba90de86661bfa98fc5c9f88e8aedb750ca434d'],
  ['dd-4b58034e',				'dr-4fa80345',		'1652047200000',		users[0].name,		users[1].name,		fakeHash(),		'0x4fbc164ac6660fc25e991aa6cba90de86661bfa98fc5c9f88e8aedb750ca435e'],
  ['dd-5b58035e',				'dr-5fa80356',		'1654898400000',		users[0].name,		users[5].name,		fakeHash(),		'0x5fbc164ac6660fc25e991aa6cba90de86661bfa98fc5c9f88e8aedb750ca436f'],
  ['dd-6b58036f',				'dr-6fa80367',		'1651615200000',		users[0].name,		users[2].name,		fakeHash(),		'0x6fbc164ac6660fc25e991aa6cba90de86661bfa98fc5c9f88e8aedb750ca437a'],
  ['dd-7b58037a',				'dr-7fa80378',		'1654380000000',		users[0].name,		users[2].name,		fakeHash(),		'0x7fbc164ac6660fc25e991aa6cba90de86661bfa98fc5c9f88e8aedb750ca438b'],
];

/* *********************************** *
 * this simulates a join tables DR & DD
 * GET documentDeliveries/:dealId
 * *********************************** */

// ORDER MATTERS : id, idDR, sentDate, sender, receiver, verificationHash, txHash
export const DDsJoinDRs = [
  ['dd-0a07450e',				{...createTable(schemaDR, DRs)[0]},		'1656108000000',		users[11].name,		users[0].name,		fakeHash(),		'0x0af0165ac6660fc25e991aa6cba90de86661bfa98fc5c9f88e8aedb750ca431a'],
  ['dd-1a08031b',				{...createTable(schemaDR, DRs)[1]},		'1652047200000',		users[12].name,		users[0].name,		fakeHash(),		'0x1af0165ac6660fc25e991aa6cba90de86661bfa98fc5c9f88e8aedb750ca432b'],
  ['dd-2a08132c',				{...createTable(schemaDR, DRs)[2]},		'1649714400000',		users[10].name,		users[0].name,		fakeHash(),		'0x2af0165ac6660fc25e991aa6cba90de86661bfa98fc5c9f88e8aedb750ca433c'],
  ['dd-3a08033d',				{...createTable(schemaDR, DRs)[3]},		'1653084000000',		users[11].name,		users[0].name,		fakeHash(),		'0x3af0165ac6660fc25e991aa6cba90de86661bfa98fc5c9f88e8aedb750ca434d'],
  ['dd-4a08034e',				{...createTable(schemaDR, DRs)[4]},		'1652133600000',		users[11].name,		users[0].name,		fakeHash(),		'0x4af0165ac6660fc25e991aa6cba90de86661bfa98fc5c9f88e8aedb750ca435e'],
  ['dd-5a08035e',				{...createTable(schemaDR, DRs)[5]},		'1654898400000',		users[10].name,		users[0].name,		fakeHash(),		'0x5af0165ac6660fc25e991aa6cba90de86661bfa98fc5c9f88e8aedb750ca436f'],
  ['dd-6a08036f',				{...createTable(schemaDR, DRs)[6]},		'1651615200000',		users[13].name,		users[0].name,		fakeHash(),		'0x6af0165ac6660fc25e991aa6cba90de86661bfa98fc5c9f88e8aedb750ca437a'],
  ['dd-7a08037a',				{...createTable(schemaDR, DRs)[7]},		'1654380000000',		users[9].name,		users[0].name,		fakeHash(),		'0x7af0165ac6660fc25e991aa6cba90de86661bfa98fc5c9f88e8aedb750ca438b'],
  ['dd-0a07450e',				{...createTable(schemaDR, DRs)[8]},		'1656108000000',		users[0].name,		users[1].name,		fakeHash(),		'0x0af0165ac6660fc25e991aa6cba90de86661bfa98fc5c9f88e8aedb750ca431a'],
  ['dd-1a08031b',				{...createTable(schemaDR, DRs)[9]},		'1652047200000',		users[0].name,		users[2].name,		fakeHash(),		'0x1af0165ac6660fc25e991aa6cba90de86661bfa98fc5c9f88e8aedb750ca432b'],
  ['dd-2a08132c',				{...createTable(schemaDR, DRs)[10]},	'1649714400000',		users[0].name,		users[3].name,		fakeHash(),		'0x2af0165ac6660fc25e991aa6cba90de86661bfa98fc5c9f88e8aedb750ca433c'],
  ['dd-3a08033d',				{...createTable(schemaDR, DRs)[11]},	'1653084000000',		users[0].name,		users[4].name,		fakeHash(),		'0x3af0165ac6660fc25e991aa6cba90de86661bfa98fc5c9f88e8aedb750ca434d'],
  ['dd-4a08034e',				{...createTable(schemaDR, DRs)[12]},	'1652133600000',		users[0].name,		users[1].name,		fakeHash(),		'0x4af0165ac6660fc25e991aa6cba90de86661bfa98fc5c9f88e8aedb750ca435e'],
  ['dd-5a08035e',				{...createTable(schemaDR, DRs)[13]},	'1654898400000',		users[0].name,		users[5].name,		fakeHash(),		'0x5af0165ac6660fc25e991aa6cba90de86661bfa98fc5c9f88e8aedb750ca436f'],
  ['dd-6a08036f',				{...createTable(schemaDR, DRs)[14]},	'1651615200000',		users[0].name,		users[2].name,		fakeHash(),		'0x6af0165ac6660fc25e991aa6cba90de86661bfa98fc5c9f88e8aedb750ca437a'],
  ['dd-7a08037a',				{...createTable(schemaDR, DRs)[15]},	'1654380000000',		users[0].name,		users[2].name,		fakeHash(),		'0x7af0165ac6660fc25e991aa6cba90de86661bfa98fc5c9f88e8aedb750ca438b'],
];
/* eslint-enable prettier/prettier */
