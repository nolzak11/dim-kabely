/* === Kalkulátor dimenzování kabelů v2.2.0 (Čistý start) === */
// Stránka se načte s prázdnými poli. Reset tlačítko načte demo hodnoty.

// --- 1. DATABÁZE (Konstanty a normy) ---

const JISTICE_RADA = [6, 10, 13, 16, 20, 25, 32, 40, 50, 63, 80, 100, 125, 160, 200, 250, 315, 400, 500, 630, 1000, 1250];
const PRUREZY_RADA = [1.5, 2.5, 4, 6, 10, 16, 25, 35, 50, 70, 95, 120, 150, 185, 240];

const KOREKCE_TEPLOTA = {
    PVC: { // 70°C
        vzduch: { 10: 1.22, 15: 1.17, 20: 1.12, 25: 1.06, 30: 1.00, 35: 0.94, 40: 0.87, 45: 0.79, 50: 0.71, 55: 0.61, 60: 0.50 },
        puda: { 10: 1.10, 15: 1.05, 20: 1.00, 25: 0.95, 30: 0.89, 35: 0.84, 40: 0.77, 45: 0.71, 50: 0.63, 55: 0.55, 60: 0.45 }
    },
    XLPE: { // 90°C
        vzduch: { 10: 1.15, 15: 1.12, 20: 1.08, 25: 1.04, 30: 1.00, 35: 0.96, 40: 0.91, 45: 0.87, 50: 0.82, 55: 0.76, 60: 0.71, 65: 0.65, 70: 0.58, 75: 0.50, 80: 0.41 },
        puda: { 10: 1.07, 15: 1.04, 20: 1.00, 25: 0.96, 30: 0.93, 35: 0.89, 40: 0.85, 45: 0.80, 50: 0.76, 55: 0.71, 60: 0.67, 65: 0.62, 70: 0.56, 75: 0.50, 80: 0.43 }
    }
};

const PARAMETRY_KABELU = {
    Cu: {
        Vicezilovy: { // CYKY
            PVC: { // 70°C
                A2: null,
                C: { 1.5: { iz: 19.5, r_prime: 15.4, x_prime: 0.082 }, 2.5: { iz: 27, r_prime: 9.21, x_prime: 0.08 }, 4: { iz: 37, r_prime: 5.78, x_prime: 0.078 }, 6: { iz: 47, r_prime: 3.84, x_prime: 0.077 }, 10: { iz: 66, r_prime: 2.28, x_prime: 0.075 }, 16: { iz: 88, r_prime: 1.43, x_prime: 0.074 }, 25: { iz: 112, r_prime: 0.91, x_prime: 0.073 }, 35: { iz: 139, r_prime: 0.65, x_prime: 0.072 }, 50: { iz: 168, r_prime: 0.47, x_prime: 0.072 }, 70: { iz: 213, r_prime: 0.32, x_prime: 0.071 }, 95: { iz: 258, r_prime: 0.23, x_prime: 0.07 }, 120: { iz: 299, r_prime: 0.18, x_prime: 0.07 }, 150: { iz: 340, r_prime: 0.15, x_prime: 0.07 }, 185: { iz: 388, r_prime: 0.12, x_prime: 0.069 }, 240: { iz: 445, r_prime: 0.09, x_prime: 0.069 } },
                D2: { 1.5: { iz: 20, r_prime: 15.4, x_prime: 0.082 }, 2.5: { iz: 26, r_prime: 9.21, x_prime: 0.08 }, 4: { iz: 34, r_prime: 5.78, x_prime: 0.078 }, 6: { iz: 43, r_prime: 3.84, x_prime: 0.077 }, 10: { iz: 58, r_prime: 2.28, x_prime: 0.075 }, 16: { iz: 75, r_prime: 1.43, x_prime: 0.074 }, 25: { iz: 94, r_prime: 0.91, x_prime: 0.073 }, 35: { iz: 113, r_prime: 0.65, x_prime: 0.072 }, 50: { iz: 134, r_prime: 0.47, x_prime: 0.072 }, 70: { iz: 168, r_prime: 0.32, x_prime: 0.071 }, 95: { iz: 198, r_prime: 0.23, x_prime: 0.07 }, 120: { iz: 226, r_prime: 0.18, x_prime: 0.07 }, 150: { iz: 256, r_prime: 0.15, x_prime: 0.07 }, 185: { iz: 289, r_prime: 0.12, x_prime: 0.069 }, 240: { iz: 330, r_prime: 0.09, x_prime: 0.069 } },
                E: null
            },
            XLPE: { // 90°C (CXKE)
                A2: null,
                C: { 1.5: { iz: 25, r_prime: 16.4, x_prime: 0.082 }, 2.5: { iz: 35, r_prime: 9.81, x_prime: 0.08 }, 4: { iz: 47, r_prime: 6.16, x_prime: 0.078 }, 6: { iz: 60, r_prime: 4.11, x_prime: 0.077 }, 10: { iz: 84, r_prime: 2.43, x_prime: 0.075 }, 16: { iz: 112, r_prime: 1.52, x_prime: 0.074 }, 25: { iz: 144, r_prime: 0.97, x_prime: 0.073 }, 35: { iz: 178, r_prime: 0.69, x_prime: 0.072 }, 50: { iz: 216, r_prime: 0.5, x_prime: 0.072 }, 70: { iz: 273, r_prime: 0.34, x_prime: 0.071 }, 95: { iz: 331, r_prime: 0.25, x_prime: 0.07 }, 120: { iz: 384, r_prime: 0.19, x_prime: 0.07 }, 150: { iz: 436, r_prime: 0.16, x_prime: 0.07 }, 185: { iz: 497, r_prime: 0.13, x_prime: 0.069 }, 240: { iz: 571, r_prime: 0.1, x_prime: 0.069 } },
                D2: { 1.5: { iz: 26, r_prime: 16.4, x_prime: 0.082 }, 2.5: { iz: 34, r_prime: 9.81, x_prime: 0.08 }, 4: { iz: 44, r_prime: 6.16, x_prime: 0.078 }, 6: { iz: 55, r_prime: 4.11, x_prime: 0.077 }, 10: { iz: 74, r_prime: 2.43, x_prime: 0.075 }, 16: { iz: 96, r_prime: 1.52, x_prime: 0.074 }, 25: { iz: 121, r_prime: 0.97, x_prime: 0.073 }, 35: { iz: 145, r_prime: 0.69, x_prime: 0.072 }, 50: { iz: 172, r_prime: 0.5, x_prime: 0.072 }, 70: { iz: 215, r_prime: 0.34, x_prime: 0.071 }, 95: { iz: 254, r_prime: 0.25, x_prime: 0.07 }, 120: { iz: 290, r_prime: 0.19, x_prime: 0.07 }, 150: { iz: 328, r_prime: 0.16, x_prime: 0.07 }, 185: { iz: 370, r_prime: 0.13, x_prime: 0.069 }, 240: { iz: 423, r_prime: 0.1, x_prime: 0.069 } },
                E: null
            }
        },
        Jednozilovy: { // 1-YY (Cu/PVC) a 1-YXKE (Cu/XLPE)
            PVC: { // 70°C (1-YY)
                A2: null,
                C: { 1.5: { iz: 24, r_prime: 15.4, x_prime: 0.081 }, 2.5: { iz: 34, r_prime: 9.21, x_prime: 0.079 }, 4: { iz: 46, r_prime: 5.78, x_prime: 0.077 }, 6: { iz: 59, r_prime: 3.84, x_prime: 0.076 }, 10: { iz: 82, r_prime: 2.28, x_prime: 0.074 }, 16: { iz: 110, r_prime: 1.43, x_prime: 0.073 }, 25: { iz: 141, r_prime: 0.91, x_prime: 0.072 }, 35: { iz: 175, r_prime: 0.65, x_prime: 0.071 }, 50: { iz: 210, r_prime: 0.47, x_prime: 0.071 }, 70: { iz: 270, r_prime: 0.32, x_prime: 0.07 }, 95: { iz: 331, r_prime: 0.23, x_prime: 0.07 }, 120: { iz: 388, r_prime: 0.18, x_prime: 0.069 }, 150: { iz: 446, r_prime: 0.15, x_prime: 0.069 }, 185: { iz: 510, r_prime: 0.12, x_prime: 0.068 }, 240: { iz: 590, r_prime: 0.09, x_prime: 0.068 } },
                D2: { 1.5: { iz: 23, r_prime: 15.4, x_prime: 0.081 }, 2.5: { iz: 31, r_prime: 9.21, x_prime: 0.079 }, 4: { iz: 41, r_prime: 5.78, x_prime: 0.077 }, 6: { iz: 52, r_prime: 3.84, x_prime: 0.076 }, 10: { iz: 70, r_prime: 2.28, x_prime: 0.074 }, 16: { iz: 92, r_prime: 1.43, x_prime: 0.073 }, 25: { iz: 118, r_prime: 0.91, x_prime: 0.072 }, 35: { iz: 143, r_prime: 0.65, x_prime: 0.071 }, 50: { iz: 171, r_prime: 0.47, x_prime: 0.071 }, 70: { iz: 216, r_prime: 0.32, x_prime: 0.07 }, 95: { iz: 260, r_prime: 0.23, x_prime: 0.07 }, 120: { iz: 300, r_prime: 0.18, x_prime: 0.069 }, 150: { iz: 342, r_prime: 0.15, x_prime: 0.069 }, 185: { iz: 388, r_prime: 0.12, x_prime: 0.068 }, 240: { iz: 448, r_prime: 0.09, x_prime: 0.068 } },
                E: null
            },
            XLPE: { // 90°C (1-YXKE)
                A2: null,
                C: { 1.5: { iz: 30, r_prime: 16.4, x_prime: 0.081 }, 2.5: { iz: 43, r_prime: 9.81, x_prime: 0.079 }, 4: { iz: 58, r_prime: 6.16, x_prime: 0.077 }, 6: { iz: 75, r_prime: 4.11, x_prime: 0.076 }, 10: { iz: 104, r_prime: 2.43, x_prime: 0.074 }, 16: { iz: 140, r_prime: 1.52, x_prime: 0.073 }, 25: { iz: 180, r_prime: 0.97, x_prime: 0.072 }, 35: { iz: 224, r_prime: 0.69, x_prime: 0.071 }, 50: { iz: 269, r_prime: 0.5, x_prime: 0.071 }, 70: { iz: 346, r_prime: 0.34, x_prime: 0.07 }, 95: { iz: 424, r_prime: 0.25, x_prime: 0.07 }, 120: { iz: 497, r_prime: 0.19, x_prime: 0.069 }, 150: { iz: 571, r_prime: 0.16, x_prime: 0.069 }, 185: { iz: 653, r_prime: 0.13, x_prime: 0.068 }, 240: { iz: 756, r_prime: 0.1, x_prime: 0.068 } },
                D2: { 1.5: { iz: 29, r_prime: 16.4, x_prime: 0.081 }, 2.5: { iz: 39, r_prime: 9.81, x_prime: 0.079 }, 4: { iz: 52, r_prime: 6.16, x_prime: 0.077 }, 6: { iz: 66, r_prime: 4.11, x_prime: 0.076 }, 10: { iz: 89, r_prime: 2.43, x_prime: 0.074 }, 16: { iz: 117, r_prime: 1.52, x_prime: 0.073 }, 25: { iz: 150, r_prime: 0.97, x_prime: 0.072 }, 35: { iz: 182, r_prime: 0.69, x_prime: 0.071 }, 50: { iz: 218, r_prime: 0.5, x_prime: 0.071 }, 70: { iz: 275, r_prime: 0.34, x_prime: 0.07 }, 95: { iz: 331, r_prime: 0.25, x_prime: 0.07 }, 120: { iz: 382, r_prime: 0.19, x_prime: 0.069 }, 150: { iz: 435, r_prime: 0.16, x_prime: 0.069 }, 185: { iz: 493, r_prime: 0.13, x_prime: 0.068 }, 240: { iz: 569, r_prime: 0.1, x_prime: 0.068 } },
                E: null
            }
        },
    },
    Al: {
        Vicezilovy: { // AYKY
            PVC: { // 70°C
                A2: null,
                C: { 1.5: null, 2.5: null, 4: null, 6: null, 10: { iz: 52, r_prime: 3.70, x_prime: 0.08 }, 16: { iz: 69, r_prime: 2.30, x_prime: 0.078 }, 25: { iz: 89, r_prime: 1.44, x_prime: 0.077 }, 35: { iz: 110, r_prime: 1.04, x_prime: 0.076 }, 50: { iz: 133, r_prime: 0.77, x_prime: 0.075 }, 70: { iz: 169, r_prime: 0.53, x_prime: 0.074 }, 95: { iz: 204, r_prime: 0.39, x_prime: 0.073 }, 120: { iz: 236, r_prime: 0.30, x_prime: 0.073 }, 150: { iz: 269, r_prime: 0.25, x_prime: 0.072 }, 185: { iz: 306, r_prime: 0.20, x_prime: 0.072 }, 240: { iz: 350, r_prime: 0.15, x_prime: 0.072 } },
                D2: { 1.5: null, 2.5: null, 4: null, 6: null, 10: { iz: 46, r_prime: 3.70, x_prime: 0.08 }, 16: { iz: 60, r_prime: 2.30, x_prime: 0.078 }, 25: { iz: 75, r_prime: 1.44, x_prime: 0.077 }, 35: { iz: 90, r_prime: 1.04, x_prime: 0.076 }, 50: { iz: 106, r_prime: 0.77, x_prime: 0.075 }, 70: { iz: 134, r_prime: 0.53, x_prime: 0.074 }, 95: { iz: 157, r_prime: 0.39, x_prime: 0.073 }, 120: { iz: 179, r_prime: 0.30, x_prime: 0.073 }, 150: { iz: 204, r_prime: 0.25, x_prime: 0.072 }, 185: { iz: 230, r_prime: 0.20, x_prime: 0.072 }, 240: { iz: 262, r_prime: 0.15, x_prime: 0.072 } },
                E: null
            },
            XLPE: { // 90°C (AXKE)
                A2: null,
                C: { 1.5: null, 2.5: null, 4: null, 6: null, 10: { iz: 66, r_prime: 4.01, x_prime: 0.08 }, 16: { iz: 88, r_prime: 2.50, x_prime: 0.078 }, 25: { iz: 114, r_prime: 1.57, x_prime: 0.077 }, 35: { iz: 140, r_prime: 1.13, x_prime: 0.076 }, 50: { iz: 169, r_prime: 0.83, x_prime: 0.075 }, 70: { iz: 215, r_prime: 0.58, x_prime: 0.074 }, 95: { iz: 260, r_prime: 0.42, x_prime: 0.073 }, 120: { iz: 300, r_prime: 0.33, x_prime: 0.073 }, 150: { iz: 342, r_prime: 0.27, x_prime: 0.072 }, 185: { iz: 388, r_prime: 0.21, x_prime: 0.072 }, 240: { iz: 445, r_prime: 0.16, x_prime: 0.072 } },
                D2: { 1.5: null, 2.5: null, 4: null, 6: null, 10: { iz: 59, r_prime: 4.01, x_prime: 0.08 }, 16: { iz: 77, r_prime: 2.50, x_prime: 0.078 }, 25: { iz: 97, r_prime: 1.57, x_prime: 0.077 }, 35: { iz: 116, r_prime: 1.13, x_prime: 0.076 }, 50: { iz: 137, r_prime: 0.83, x_prime: 0.075 }, 70: { iz: 172, r_prime: 0.58, x_prime: 0.074 }, 95: { iz: 202, r_prime: 0.42, x_prime: 0.073 }, 120: { iz: 229, r_prime: 0.33, x_prime: 0.073 }, 150: { iz: 259, r_prime: 0.27, x_prime: 0.072 }, 185: { iz: 292, r_prime: 0.21, x_prime: 0.072 }, 240: { iz: 332, r_prime: 0.16, x_prime: 0.072 } },
                E: null
            }
        },
        Jednozilovy: { // 1-AY (Al/PVC) a 1-AX (Al/XLPE)
            PVC: { // 70°C
                A2: null,
                C: { 1.5: null, 2.5: null, 4: null, 6: null, 10: { iz: 66, r_prime: 3.70, x_prime: 0.079 }, 16: { iz: 87, r_prime: 2.30, x_prime: 0.077 }, 25: { iz: 112, r_prime: 1.44, x_prime: 0.076 }, 35: { iz: 139, r_prime: 1.04, x_prime: 0.075 }, 50: { iz: 168, r_prime: 0.77, x_prime: 0.074 }, 70: { iz: 214, r_prime: 0.53, x_prime: 0.073 }, 95: { iz: 261, r_prime: 0.39, x_prime: 0.072 }, 120: { iz: 304, r_prime: 0.30, x_prime: 0.072 }, 150: { iz: 348, r_prime: 0.25, x_prime: 0.071 }, 185: { iz: 398, r_prime: 0.20, x_prime: 0.071 }, 240: { iz: 458, r_prime: 0.15, x_prime: 0.071 } },
                D2: { 1.5: null, 2.5: null, 4: null, 6: null, 10: { iz: 59, r_prime: 3.70, x_prime: 0.079 }, 16: { iz: 77, r_prime: 2.30, x_prime: 0.077 }, 25: { iz: 98, r_prime: 1.44, x_prime: 0.076 }, 35: { iz: 118, r_prime: 1.04, x_prime: 0.075 }, 50: { iz: 141, r_prime: 0.77, x_prime: 0.074 }, 70: { iz: 178, r_prime: 0.53, x_prime: 0.073 }, 95: { iz: 213, r_prime: 0.39, x_prime: 0.072 }, 120: { iz: 245, r_prime: 0.30, x_prime: 0.072 }, 150: { iz: 279, r_prime: 0.25, x_prime: 0.071 }, 185: { iz: 315, r_prime: 0.20, x_prime: 0.071 }, 240: { iz: 360, r_prime: 0.15, x_prime: 0.071 } },
                E: null
            },
            XLPE: { // 90°C
                A2: null,
                C: { 1.5: null, 2.5: null, 4: null, 6: null, 10: { iz: 83, r_prime: 4.01, x_prime: 0.079 }, 16: { iz: 111, r_prime: 2.50, x_prime: 0.077 }, 25: { iz: 143, r_prime: 1.57, x_prime: 0.076 }, 35: { iz: 177, r_prime: 1.13, x_prime: 0.075 }, 50: { iz: 214, r_prime: 0.83, x_prime: 0.074 }, 70: { iz: 273, r_prime: 0.58, x_prime: 0.073 }, 95: { iz: 332, r_prime: 0.42, x_prime: 0.072 }, 120: { iz: 386, r_prime: 0.33, x_prime: 0.072 }, 150: { iz: 442, r_prime: 0.27, x_prime: 0.071 }, 185: { iz: 505, r_prime: 0.21, x_prime: 0.071 }, 240: { iz: 582, r_prime: 0.16, x_prime: 0.071 } },
                D2: { 1.5: null, 2.5: null, 4: null, 6: null, 10: { iz: 75, r_prime: 4.01, x_prime: 0.079 }, 16: { iz: 98, r_prime: 2.50, x_prime: 0.077 }, 25: { iz: 124, r_prime: 1.57, x_prime: 0.076 }, 35: { iz: 150, r_prime: 1.13, x_prime: 0.075 }, 50: { iz: 179, r_prime: 0.83, x_prime: 0.074 }, 70: { iz: 226, r_prime: 0.58, x_prime: 0.073 }, 95: { iz: 270, r_prime: 0.42, x_prime: 0.072 }, 120: { iz: 311, r_prime: 0.33, x_prime: 0.072 }, 150: { iz: 354, r_prime: 0.27, x_prime: 0.071 }, 185: { iz: 400, r_prime: 0.21, x_prime: 0.071 }, 240: { iz: 457, r_prime: 0.16, x_prime: 0.071 } },
                E: null
            }
        }
    }
};

// --- 2. Pomocné funkce ---

const el = (id) => document.getElementById(id);
const getValueAsNum = (id) => parseFloat(el(id).value) || 0;
const getRadioValue = (name) => document.querySelector(`input[name="${name}"]:checked`)?.value; // Přidáno ? pro jistotu
const getSelectValue = (id) => el(id).value;

const debounce = (func, delay = 250) => {
    let timeoutId;
    return (...args) => {
        clearTimeout(timeoutId);
        timeoutId = setTimeout(() => {
            func.apply(this, args);
        }, delay);
    };
};

// --- 3. Logika aplikace ---

function syncPowerAndCurrent(changedField) {
    const napetiElement = document.querySelector('input[name="napeti"]:checked');
    if (!napetiElement) return; // Ochrana, pokud není nic vybráno
    const napeti = parseFloat(napetiElement.value);
    const cosPhi = getValueAsNum('cosPhi');
    if (!cosPhi || cosPhi <= 0 || cosPhi > 1) return; // Neplatný cosPhi

    const sqrt3 = Math.sqrt(3);
    let vykon = getValueAsNum('vykon');
    let proud = getValueAsNum('proud');

    try {
        if (changedField === 'vykon') {
            const P_W = vykon * 1000;
            if (P_W === 0) {
                el('proud').value = ''; return;
            }
            proud = (napeti === 230) ? (P_W / (napeti * cosPhi)) : (P_W / (napeti * sqrt3 * cosPhi));
            el('proud').value = proud > 0 ? proud.toFixed(2) : '';
        }
        else if (changedField === 'proud') {
            if (proud === 0) {
                el('vykon').value = ''; return;
            }
            const P_W = (napeti === 230) ? (napeti * proud * cosPhi) : (napeti * sqrt3 * proud * cosPhi);
            vykon = P_W / 1000;
            el('vykon').value = vykon > 0 ? vykon.toFixed(2) : '';
        }
    } catch (e) {
        console.error("Chyba při synchronizaci P a I:", e);
        el('proud').value = ''; // Reset pro jistotu
        el('vykon').value = '';
    }
}

function getKorekceTeploty(izolace, ulozeni, teplotaOkoli) {
    const typOkoli = (ulozeni === 'D2') ? 'puda' : 'vzduch';
    // Ochrana pro případ, že by data chyběla
    const tabulka = KOREKCE_TEPLOTA[izolace]?.[typOkoli];
    if (!tabulka) return 1.0;

    const teploty = Object.keys(tabulka).map(Number).sort((a, b) => a - b);
    let nejblizsiTeplota = teploty[0];
    for (const t of teploty) {
        if (t <= teplotaOkoli) {
            nejblizsiTeplota = t;
        } else {
            break;
        }
    }
    // Ochrana, pokud teplota není v tabulce
    return tabulka[nejblizsiTeplota] || 1.0;
}

function calculate() {
    const tbody = el('result-tbody');
    tbody.innerHTML = '';

    try {
        // Krok 1: Shromáždění vstupů
        const inputs = {
            napeti: parseFloat(getRadioValue('napeti') || '400'),
            proud_IB: getValueAsNum('proud'),
            delka: getValueAsNum('delka'),
            max_ubytek_pct: getValueAsNum('ubytek'),
            material: getRadioValue('material') || 'Cu',
            typKabelu: getRadioValue('kabelTyp') || 'Vicezilovy',
            pocetParalelne: parseFloat(getRadioValue('paralelne') || '1'),
            ulozeni: getSelectValue('ulozeni'),
            cosPhi: getValueAsNum('cosPhi'),
            sinPhi: Math.sin(Math.acos(getValueAsNum('cosPhi') || 1.0)),
            izolace: getSelectValue('izolace'),
            teplotaOkoli: getValueAsNum('teplotaOkoli'),
            kSoubeh: getValueAsNum('korekceSoubeh') || 1.0,
            kPuda: getValueAsNum('korekcePuda') || 1.0,
            startPrurez: getValueAsNum('startPrurez'),
            pocetRadku: Math.max(1, Math.min(10, getValueAsNum('pocetRadku') || 5))
        };

        // Aktualizujeme hodnotu v poli, pokud ji JS oříznul
        el('pocetRadku').value = inputs.pocetRadku;

        if (inputs.proud_IB <= 0 || inputs.delka <= 0 || inputs.cosPhi <= 0 || inputs.cosPhi > 1) {
            throw new Error("Zadejte platné vstupní hodnoty (Proud > 0, Délka > 0, 0 < cos φ <= 1).");
        }

        displayError(null);

        // Krok 2: Stanovení jističe a požadavku na Iz'
        const jisticIn = JISTICE_RADA.find(j => j >= inputs.proud_IB);
        if (!jisticIn) {
            throw new Error("Proud zátěže je příliš vysoký (mimo řadu).");
        }
        el('info-jistic').textContent = `${jisticIn} A (char. B/C/D)`;
        const pozadovanaIzKorigovana = jisticIn;
        el('info-iz-req').textContent = `≥ ${pozadovanaIzKorigovana.toFixed(0)} A`;

        // Krok 3: Příprava dat a korekcí
        const tabulkaParametru = PARAMETRY_KABELU[inputs.material]?.[inputs.typKabelu]?.[inputs.izolace]?.[inputs.ulozeni];

        if (!tabulkaParametru) {
            throw new Error(`Pro kombinaci ${inputs.material}/${inputs.izolace} a uložení "${inputs.ulozeni}" nejsou k dispozici data.`);
        }

        const kTeplota = getKorekceTeploty(inputs.izolace, inputs.ulozeni, inputs.teplotaOkoli);
        const kTotal = kTeplota * inputs.kSoubeh * inputs.kPuda;

        const K_ubytek = (inputs.napeti === 230) ? 2 : Math.sqrt(3);
        const K_ztraty = (inputs.napeti === 230) ? 2 : 3;

        // Krok 4: Generování tabulky
        let startIndex = PRUREZY_RADA.indexOf(inputs.startPrurez);
        if (startIndex === -1) {
            // Najde nejbližší *vyšší* nebo rovný průřez v řadě
            const firstValidIndex = PRUREZY_RADA.findIndex(p => p >= inputs.startPrurez);
            if (firstValidIndex === -1) throw new Error("Startovní průřez je příliš velký.");
            // Nastaví select na platnou hodnotu
            el('startPrurez').value = PRUREZY_RADA[firstValidIndex];
            startIndex = firstValidIndex;
        }


        for (let i = startIndex; i < Math.min(startIndex + inputs.pocetRadku, PRUREZY_RADA.length); i++) {
            const prurez = PRUREZY_RADA[i];
            const param = tabulkaParametru[prurez];
            const n = inputs.pocetParalelne; // Počet paralelních kabelů
            const typ = inputs.typKabelu; // "Vicezilovy" or "Jednozilovy"

            let vedeniPopisZaklad = '';
            if (typ === 'Jednozilovy') {
                vedeniPopisZaklad = `Žíly 3x(1x${prurez} mm²)`;
            } else {
                vedeniPopisZaklad = `Kabel 3x${prurez} mm²`;
            }

            let vedeniPopis = (n > 1) ? `${n} x [${vedeniPopisZaklad}]` : vedeniPopisZaklad;

            const ib_per_cable = inputs.proud_IB / n;

            const tr = document.createElement('tr');

            if (!param) {
                tr.innerHTML = `
                    <td>${vedeniPopis}</td>
                    <td colspan="5" style="color: var(--text-muted); font-style: italic;">Data nejsou k dispozici</td>
                `;
                tbody.appendChild(tr);
                continue;
            }

            const iz_korigovana_jeden = param.iz * kTotal;
            const iz_korigovana_total = iz_korigovana_jeden * n;

            const r_prime = param.r_prime;
            const x_prime = param.x_prime;

            const ubytekV = K_ubytek * ib_per_cable * (inputs.delka / 1000) * (r_prime * inputs.cosPhi + x_prime * inputs.sinPhi);
            const ubytekPct = (ubytekV / inputs.napeti) * 100;

            const R_faze_provozni = r_prime * (inputs.delka / 1000);
            const ztratyW_jeden = K_ztraty * (ib_per_cable ** 2) * R_faze_provozni;
            const ztratyW_total = ztratyW_jeden * n;

            const vyhovujeIz = (iz_korigovana_total >= pozadovanaIzKorigovana);
            const vyhovujeDU = (ubytekPct <= inputs.max_ubytek_pct);

            let statusText = '';
            let statusClass = '';

            if (!vyhovujeIz) {
                statusText = 'Nevyhoví I<sub>Z</sub>\'';
                statusClass = 'status-danger';
            } else if (!vyhovujeDU) {
                statusText = 'Nevyhoví &Delta;U';
                statusClass = 'status-warning';
            } else {
                statusText = 'OK';
                statusClass = 'status-ok';
            }

            tr.className = statusClass;
            tr.innerHTML = `
                <td>${vedeniPopis}</td>
                <td>${ubytekPct.toFixed(2)} %</td>
                <td>${ubytekV.toFixed(1)} V</td>
                <td>${ztratyW_total.toFixed(0)} W</td>
                <td>${iz_korigovana_total.toFixed(1)} A</td>
                <td><span class="status-text ${statusClass}">${statusText}</span></td>
            `;
            tbody.appendChild(tr);
        }

    } catch (error) {
        console.error("Chyba výpočtu:", error);
        displayError(error.message);
        el('info-jistic').textContent = '...';
        el('info-iz-req').textContent = '...';
    }
}

// --- 4. Zobrazovací funkce ---

function displayError(message) {
    const errorBox = el('error-message');
    if (message) {
        errorBox.textContent = message;
        errorBox.style.display = 'block';
    } else {
        errorBox.textContent = '';
        errorBox.style.display = 'none';
    }
}

function populateStartPrurez() {
    const select = el('startPrurez');
    select.innerHTML = ''; // Vyčistíme před naplněním
    PRUREZY_RADA.forEach(prurez => {
        if (PARAMETRY_KABELU.Cu?.Vicezilovy?.PVC?.C?.[prurez]) {
            const option = document.createElement('option');
            option.value = prurez;
            option.textContent = `${prurez} mm²`;
            select.appendChild(option);
        }
    });
    // Výchozí hodnota - najdeme nejbližší k 50
    const defaultStart = PRUREZY_RADA.find(p => p >= 50) || PRUREZY_RADA[PRUREZY_RADA.length - 1];
    select.value = defaultStart;
}

// Funkce resetDefaults teď slouží jako "Načíst demo"
function resetDefaults() {
    // Radia
    el('u400').checked = true;
    el('cu').checked = true;
    el('kabelTypMulti').checked = true;
    el('paralelne1').checked = true;

    // Běžné inputy - toto jsou DEMO hodnoty
    el('vykon').value = 250;
    el('proud').value = ''; // Bude dopočítán
    el('cosPhi').value = 0.9;
    el('delka').value = 30;
    el('ubytek').value = 5.0;
    el('teplotaOkoli').value = 20;
    el('korekceSoubeh').value = 1.0;
    el('korekcePuda').value = 1.0;
    el('pocetRadku').value = 5;

    // Selecty
    el('ulozeni').value = 'D2';
    el('izolace').value = 'PVC';

    // Speciální select pro startPrurez (logika z populateStartPrurez)
    const defaultStart = PRUREZY_RADA.find(p => p >= 50) || PRUREZY_RADA[PRUREZY_RADA.length - 1];
    el('startPrurez').value = defaultStart;

    // Vyčistit chyby
    displayError(null);

    // Znovu synchronizovat a vypočítat
    syncPowerAndCurrent('vykon'); // Spustí se s výkonem 250 kW
    calculate();
}


// --- 5. Inicializace a Event Listenery ---

document.addEventListener('DOMContentLoaded', () => {

    populateStartPrurez(); // Naplní <select> a nastaví jeho výchozí hodnotu (50mm²)

    const allInputs = [
        ...document.querySelectorAll('input[name="napeti"]'),
        ...document.querySelectorAll('input[name="material"]'),
        ...document.querySelectorAll('input[name="kabelTyp"]'),
        ...document.querySelectorAll('input[name="paralelne"]'),
        el('vykon'),
        el('proud'),
        el('cosPhi'),
        el('delka'),
        el('ubytek'),
        el('ulozeni'),
        el('izolace'),
        el('teplotaOkoli'),
        el('korekceSoubeh'),
        el('korekcePuda'),
        el('startPrurez'),
        el('pocetRadku')
    ];

    // Tlačítko resetu teď volá funkci, která načte demo hodnoty
    el('resetButton')?.addEventListener('click', (e) => {
        e.preventDefault();
        resetDefaults();
    });

    const debouncedCalculate = debounce(calculate, 300);

    allInputs.forEach(input => {
        input?.addEventListener('input', (e) => {
            if (!e || !e.target) return;

            const targetId = e.target.id;

            if (targetId === 'vykon') {
                syncPowerAndCurrent('vykon');
            } else if (targetId === 'proud') {
                syncPowerAndCurrent('proud');
            } else if (targetId === 'cosPhi') {
                if (getValueAsNum('vykon') > 0 || el('vykon').value) {
                    syncPowerAndCurrent('vykon');
                }
            }

            debouncedCalculate();
        });
    });

    // Spustíme 'calculate()', který přečte prázdné hodnoty
    // a zobrazí chybu "Zadejte platné vstupní hodnoty...".
    calculate();
});