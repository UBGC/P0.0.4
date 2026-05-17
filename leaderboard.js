(function () {
  const LEADERBOARD_KEY = "pog_leaderboard";
  const PARTY_LEADERBOARD_PREFIX = "pog_leaderboard_party_";
  const LOCAL_PARTIES_KEY = "pog_local_parties";
  const CURRENT_PARTY_KEY = "pog_current_party";
  const NICK_KEY = "nick";
  const DEFAULT_NICK = "player";
  const SCORE_RETENTION_MONTHS = 3;

  const PARTY_CODE_LENGTH = 6;
  const PARTY_MIN_DURATION_MINUTES = 10;
  const PARTY_MAX_DURATION_MINUTES = 129600; // 3 months
  const PARTY_COUNTRY_OPTIONS = [
    { code: "PL", label: "Poland (PL)" },
    { code: "D", label: "Germany (D)" }
  ];

  const firebaseConfig = {
    apiKey: "AIzaSyCUEgJkX0g3gKU5FqUr4KvRf3xQ810e9aU",
    authDomain: "plate-o-guesser.firebaseapp.com",
    projectId: "plate-o-guesser",
    storageBucket: "plate-o-guesser.firebasestorage.app",
    messagingSenderId: "390915988672",
    appId: "1:390915988672:web:260d42924525bee2ed2125",
    measurementId: "G-43KM64CWN6",
    databaseURL: "https://plate-o-guesser-default-rtdb.europe-west1.firebasedatabase.app"
  };

  const translations = {
    en: {
      title: "Best scores",
      close: "Close",
      empty: "No scores yet",
      points: "points"
    },
    pl: {
      title: "Najlepsze wyniki",
      close: "Zamknij",
      empty: "Brak wynikow",
      points: "punktow"
    },
    ua: {
      title: "Best scores",
      close: "Close",
      empty: "No scores yet",
      points: "points"
    },
    lt: {
      title: "Best scores",
      close: "Close",
      empty: "No scores yet",
      points: "points"
    },
    de: {
      title: "Beste Ergebnisse",
      close: "Schliessen",
      empty: "Noch keine Ergebnisse",
      points: "Punkte"
    },
    es: {
      title: "Mejores resultados",
      close: "Cerrar",
      empty: "Todavia no hay resultados",
      points: "puntos"
    },
    fr: {
      title: "Meilleurs scores",
      close: "Fermer",
      empty: "Aucun score pour le moment",
      points: "points"
    },
    he: {
      title: "Best scores",
      close: "Close",
      empty: "No scores yet",
      points: "points"
    }
  };

  let remoteDb = null;

  function getLanguage() {
    return localStorage.getItem("language") || "en";
  }

  function getTranslations() {
    return translations[getLanguage()] || translations.en;
  }

  function sanitizeNick(nick) {
    return String(nick || "")
      .trim()
      .replace(/[.#$/\[\]]/g, "_")
      .replace(/\s+/g, " ")
      .slice(0, 24);
  }

  function getSavedNick() {
    return sanitizeNick(localStorage.getItem(NICK_KEY) || "");
  }

  function setSavedNick(nick) {
    const cleanNick = sanitizeNick(nick);
    if (cleanNick) {
      localStorage.setItem(NICK_KEY, cleanNick);
    } else {
      localStorage.removeItem(NICK_KEY);
    }
    return cleanNick;
  }

  function getEffectiveNick(nick) {
    return sanitizeNick(nick) || getSavedNick() || DEFAULT_NICK;
  }

  function normalizeScore(score) {
    const numericScore = Number(score);
    return Number.isFinite(numericScore) ? Math.max(0, Math.round(numericScore)) : 0;
  }

  function normalizeSavedAt(savedAt, fallbackTimestamp) {
    const fallback =
      Number.isFinite(fallbackTimestamp) && fallbackTimestamp > 0 ? fallbackTimestamp : Date.now();
    const numericSavedAt = Number(savedAt);
    if (Number.isFinite(numericSavedAt) && numericSavedAt > 0) {
      return Math.round(numericSavedAt);
    }
    const parsedSavedAt = Date.parse(savedAt);
    return Number.isFinite(parsedSavedAt) ? parsedSavedAt : fallback;
  }

  function getRetentionCutoff(referenceTimestamp) {
    const referenceDate = new Date(normalizeSavedAt(referenceTimestamp, Date.now()));
    referenceDate.setMonth(referenceDate.getMonth() - SCORE_RETENTION_MONTHS);
    return referenceDate.getTime();
  }

  function isExpired(savedAt, referenceTimestamp) {
    return normalizeSavedAt(savedAt, referenceTimestamp) < getRetentionCutoff(referenceTimestamp);
  }

  function sortEntries(entries) {
    return entries.sort(function (a, b) {
      if (b.wynik !== a.wynik) return b.wynik - a.wynik;
      const savedAtDiff = normalizeSavedAt(b.savedAt, 0) - normalizeSavedAt(a.savedAt, 0);
      if (savedAtDiff !== 0) return savedAtDiff;
      return a.nick.localeCompare(b.nick, getLanguage());
    });
  }

  function mergeEntries(entries, referenceTimestamp) {
    const now = normalizeSavedAt(referenceTimestamp, Date.now());
    const merged = {};

    entries.forEach(function (entry) {
      if (!entry) return;
      const nick = getEffectiveNick(entry.nick);
      const wynik = normalizeScore(entry.wynik);
      const savedAt = normalizeSavedAt(entry.savedAt, now);
      if (isExpired(savedAt, now)) return;

      if (
        !(nick in merged) ||
        wynik > merged[nick].wynik ||
        (wynik === merged[nick].wynik && savedAt > merged[nick].savedAt)
      ) {
        merged[nick] = { wynik: wynik, savedAt: savedAt };
      }
    });

    return sortEntries(
      Object.keys(merged).map(function (nick) {
        return {
          nick: nick,
          wynik: merged[nick].wynik,
          savedAt: merged[nick].savedAt
        };
      })
    );
  }

  function sanitizePartyCode(code) {
    return String(code || "")
      .toUpperCase()
      .replace(/[^A-Z0-9]/g, "")
      .slice(0, PARTY_CODE_LENGTH);
  }

  function normalizePartyDuration(durationMinutes) {
    const numeric = Number(durationMinutes);
    if (!Number.isFinite(numeric)) return PARTY_MIN_DURATION_MINUTES;
    return Math.min(PARTY_MAX_DURATION_MINUTES, Math.max(PARTY_MIN_DURATION_MINUTES, Math.round(numeric)));
  }

  function getAllowedPartyCountryCodes() {
    return PARTY_COUNTRY_OPTIONS.map(function (item) {
      return item.code;
    });
  }

  function normalizePartyCountries(countries) {
    const allowed = getAllowedPartyCountryCodes();
    let candidateList = [];

    if (Array.isArray(countries)) {
      candidateList = countries;
    } else if (countries && typeof countries === "object") {
      candidateList = Object.keys(countries).filter(function (code) {
        return !!countries[code];
      });
    }

    const normalized = [];
    candidateList.forEach(function (countryCode) {
      const code = String(countryCode || "").toUpperCase();
      if (allowed.indexOf(code) === -1) return;
      if (normalized.indexOf(code) !== -1) return;
      normalized.push(code);
    });

    if (!normalized.length) {
      return allowed.slice();
    }

    return normalized;
  }

  function countriesToMap(countries) {
    const map = {};
    normalizePartyCountries(countries).forEach(function (code) {
      map[code] = true;
    });
    return map;
  }

  function normalizePartyMeta(rawMeta, fallbackCode) {
    if (!rawMeta || typeof rawMeta !== "object") return null;

    const code = sanitizePartyCode(rawMeta.code || fallbackCode);
    if (!code) return null;

    const createdAt = normalizeSavedAt(rawMeta.createdAt, Date.now());
    const durationMinutes = normalizePartyDuration(rawMeta.durationMinutes);
    const fallbackExpiry = createdAt + durationMinutes * 60 * 1000;
    const expiresAt = normalizeSavedAt(rawMeta.expiresAt, fallbackExpiry);
    const countries = normalizePartyCountries(rawMeta.countries);

    return {
      code: code,
      countries: countries,
      durationMinutes: durationMinutes,
      createdAt: createdAt,
      expiresAt: expiresAt,
      ownerNick: sanitizeNick(rawMeta.ownerNick || DEFAULT_NICK)
    };
  }

  function isPartyExpired(expiresAt, referenceTimestamp) {
    const now = normalizeSavedAt(referenceTimestamp, Date.now());
    return normalizeSavedAt(expiresAt, now) <= now;
  }

  function readLocalParties() {
    try {
      const parsed = JSON.parse(localStorage.getItem(LOCAL_PARTIES_KEY) || "{}");
      if (parsed && typeof parsed === "object" && !Array.isArray(parsed)) {
        return parsed;
      }
      return {};
    } catch (error) {
      console.warn("Nie udalo sie odczytac lokalnych imprez:", error);
      return {};
    }
  }

  function writeLocalParties(parties) {
    localStorage.setItem(LOCAL_PARTIES_KEY, JSON.stringify(parties || {}));
  }

  function upsertLocalParty(meta) {
    const normalized = normalizePartyMeta(meta, meta && meta.code);
    if (!normalized) return null;
    const parties = readLocalParties();
    parties[normalized.code] = {
      code: normalized.code,
      countries: countriesToMap(normalized.countries),
      durationMinutes: normalized.durationMinutes,
      createdAt: normalized.createdAt,
      expiresAt: normalized.expiresAt,
      ownerNick: normalized.ownerNick
    };
    writeLocalParties(parties);
    return normalized;
  }

  function getLocalPartyMeta(code) {
    const cleanCode = sanitizePartyCode(code);
    if (!cleanCode) return null;

    const parties = readLocalParties();
    const rawMeta = parties[cleanCode];
    if (!rawMeta) return null;

    const normalized = normalizePartyMeta(rawMeta, cleanCode);
    if (!normalized) return null;

    if (isPartyExpired(normalized.expiresAt)) {
      delete parties[cleanCode];
      writeLocalParties(parties);
      return null;
    }

    return normalized;
  }

  function setCurrentPartyCode(code) {
    const cleanCode = sanitizePartyCode(code);
    if (cleanCode) {
      localStorage.setItem(CURRENT_PARTY_KEY, cleanCode);
    } else {
      localStorage.removeItem(CURRENT_PARTY_KEY);
    }
    return cleanCode;
  }

  function getCurrentPartyCode() {
    return sanitizePartyCode(localStorage.getItem(CURRENT_PARTY_KEY) || "");
  }

  function clearCurrentParty() {
    localStorage.removeItem(CURRENT_PARTY_KEY);
  }

  function getLeaderboardScope(options) {
    let partyCode = "";
    if (typeof options === "string") {
      partyCode = options;
    } else if (options && typeof options === "object") {
      partyCode = options.partyCode || options.code || "";
    }

    const cleanPartyCode = sanitizePartyCode(partyCode);
    if (cleanPartyCode) {
      return {
        partyCode: cleanPartyCode,
        storageKey: PARTY_LEADERBOARD_PREFIX + cleanPartyCode
      };
    }

    return {
      partyCode: null,
      storageKey: LEADERBOARD_KEY
    };
  }

  function getStorageKeyForScope(scope) {
    return scope && scope.storageKey ? scope.storageKey : LEADERBOARD_KEY;
  }

  function readLocalLeaderboard(scope) {
    const storageKey = getStorageKeyForScope(scope);
    try {
      const parsed = JSON.parse(localStorage.getItem(storageKey) || "[]");
      const fallbackTimestamp = Date.now();

      if (Array.isArray(parsed)) {
        return parsed;
      }

      if (!parsed || typeof parsed !== "object") {
        return [];
      }

      return Object.keys(parsed).map(function (nick) {
        const value = parsed[nick];
        if (value && typeof value === "object" && !Array.isArray(value)) {
          return {
            nick: nick,
            wynik: value.wynik,
            savedAt: value.savedAt
          };
        }

        return {
          nick: nick,
          wynik: value,
          savedAt: fallbackTimestamp
        };
      });
    } catch (error) {
      console.warn("Nie udalo sie odczytac lokalnego rankingu:", error);
      return [];
    }
  }

  function writeLocalLeaderboard(entries, scope) {
    const storageKey = getStorageKeyForScope(scope);
    localStorage.setItem(storageKey, JSON.stringify(entries));
  }

  function getLocalEntries(scope) {
    const entries = mergeEntries(readLocalLeaderboard(scope));
    writeLocalLeaderboard(entries, scope);
    return entries;
  }

  function saveLocalScore(nick, score, scope) {
    const cleanNick = getEffectiveNick(nick);
    const numericScore = normalizeScore(score);
    const savedAt = Date.now();
    const entries = readLocalLeaderboard(scope);

    entries.push({
      nick: cleanNick,
      wynik: numericScore,
      savedAt: savedAt
    });

    const mergedEntries = mergeEntries(entries, savedAt);
    writeLocalLeaderboard(mergedEntries, scope);

    const savedEntry = mergedEntries.find(function (entry) {
      return entry.nick === cleanNick;
    });

    return (
      savedEntry || {
        nick: cleanNick,
        wynik: numericScore,
        savedAt: savedAt
      }
    );
  }

  function getRemoteDb() {
    if (!window.firebase || !firebaseConfig.databaseURL) return null;

    try {
      if (!remoteDb) {
        if (!window.firebase.apps.length) {
          window.firebase.initializeApp(firebaseConfig);
        }
        remoteDb = window.firebase.database();
      }
      return remoteDb;
    } catch (error) {
      console.warn("Nie udalo sie uruchomic Firebase dla rankingu:", error);
      return null;
    }
  }

  function getPartyMetaPath(partyCode) {
    return "parties/" + partyCode + "/meta";
  }

  function getPartyScoresPath(partyCode) {
    return "parties/" + partyCode + "/scores";
  }

  function getScoresPathForScope(scope) {
    if (scope && scope.partyCode) {
      return getPartyScoresPath(scope.partyCode);
    }
    return "scores";
  }

  async function fetchPartyMeta(code) {
    const cleanCode = sanitizePartyCode(code);
    if (!cleanCode) return null;

    const db = getRemoteDb();
    if (db) {
      try {
        const snapshot = await db.ref(getPartyMetaPath(cleanCode)).once("value");
        if (snapshot.exists()) {
          const remoteMeta = normalizePartyMeta(snapshot.val(), cleanCode);
          if (remoteMeta && !isPartyExpired(remoteMeta.expiresAt)) {
            upsertLocalParty(remoteMeta);
            return remoteMeta;
          }
        }
      } catch (error) {
        console.warn("Nie udalo sie pobrac danych imprezy z Firebase:", error);
      }
    }

    return getLocalPartyMeta(cleanCode);
  }

  async function getCurrentPartyMeta() {
    const currentCode = getCurrentPartyCode();
    if (!currentCode) return null;

    const meta = await fetchPartyMeta(currentCode);
    if (!meta) {
      clearCurrentParty();
      return null;
    }

    return meta;
  }

  function getPartyCodeFromUrl() {
    try {
      const params = new URLSearchParams(window.location.search || "");
      return sanitizePartyCode(params.get("party") || "");
    } catch (error) {
      return "";
    }
  }

  function generatePartyCode() {
    const chars = "ABCDEFGHJKLMNPQRSTUVWXYZ23456789";
    let code = "";
    for (let index = 0; index < PARTY_CODE_LENGTH; index += 1) {
      code += chars[Math.floor(Math.random() * chars.length)];
    }
    return code;
  }

  async function createParty(options) {
    const countries = normalizePartyCountries(options && options.countries);
    const durationMinutes = normalizePartyDuration(options && options.durationMinutes);
    const ownerNick = getEffectiveNick(options && options.nick);
    const db = getRemoteDb();

    for (let attempt = 0; attempt < 15; attempt += 1) {
      const code = generatePartyCode();
      const now = Date.now();
      const meta = {
        code: code,
        countries: countriesToMap(countries),
        durationMinutes: durationMinutes,
        createdAt: now,
        expiresAt: now + durationMinutes * 60 * 1000,
        ownerNick: ownerNick
      };

      if (db) {
        try {
          const transactionResult = await db.ref(getPartyMetaPath(code)).transaction(function (current) {
            if (current) {
              const currentMeta = normalizePartyMeta(current, code);
              if (currentMeta && !isPartyExpired(currentMeta.expiresAt, now)) {
                return;
              }
            }
            return meta;
          });

          if (transactionResult && transactionResult.committed) {
            const normalizedRemote = normalizePartyMeta(meta, code);
            if (normalizedRemote) {
              upsertLocalParty(normalizedRemote);
              setCurrentPartyCode(code);
              return normalizedRemote;
            }
          }
          continue;
        } catch (error) {
          console.warn("Nie udalo sie utworzyc imprezy w Firebase, probuje lokalnie:", error);
        }
      }

      const existingLocal = getLocalPartyMeta(code);
      if (existingLocal && !isPartyExpired(existingLocal.expiresAt, now)) {
        continue;
      }

      const normalizedLocal = upsertLocalParty(meta);
      if (normalizedLocal) {
        setCurrentPartyCode(code);
        return normalizedLocal;
      }
    }

    throw new Error("Nie udalo sie utworzyc imprezy. Sprobuj ponownie.");
  }

  async function joinParty(code) {
    const cleanCode = sanitizePartyCode(code);
    if (cleanCode.length !== PARTY_CODE_LENGTH) {
      throw new Error("Kod imprezy musi miec 6 znakow.");
    }

    const meta = await fetchPartyMeta(cleanCode);
    if (!meta) {
      throw new Error("Nie znaleziono imprezy o podanym kodzie.");
    }

    if (isPartyExpired(meta.expiresAt)) {
      throw new Error("Ta impreza juz wygasla.");
    }

    setCurrentPartyCode(meta.code);
    return meta;
  }

  async function fetchRemoteEntries(scope) {
    const db = getRemoteDb();
    if (!db) return [];

    if (scope && scope.partyCode) {
      const partyMeta = await fetchPartyMeta(scope.partyCode);
      if (!partyMeta || isPartyExpired(partyMeta.expiresAt)) {
        return [];
      }
    }

    const scoresPath = getScoresPathForScope(scope);

    try {
      const snapshot = await db.ref(scoresPath).once("value");
      const entries = [];
      const now = Date.now();
      const removals = {};
      let hasRemovals = false;

      snapshot.forEach(function (child) {
        const value = child.val();
        if (value && typeof value === "object" && !Array.isArray(value)) {
          const savedAt = normalizeSavedAt(value.savedAt, now);
          if (isExpired(savedAt, now)) {
            removals[child.key] = null;
            hasRemovals = true;
            return;
          }

          entries.push({
            nick: child.key,
            wynik: value.wynik,
            savedAt: savedAt
          });
          return;
        }

        entries.push({
          nick: child.key,
          wynik: value,
          savedAt: now
        });
      });

      if (hasRemovals) {
        await db.ref(scoresPath).update(removals);
      }

      return mergeEntries(entries, now);
    } catch (error) {
      console.warn("Nie udalo sie pobrac rankingu z Firebase:", error);
      return [];
    }
  }

  async function saveRemoteScore(nick, score, scope) {
    const db = getRemoteDb();
    if (!db) return false;

    if (scope && scope.partyCode) {
      const partyMeta = await fetchPartyMeta(scope.partyCode);
      if (!partyMeta || isPartyExpired(partyMeta.expiresAt)) {
        return false;
      }
    }

    const cleanNick = getEffectiveNick(nick);
    const numericScore = normalizeScore(score);
    const now = Date.now();
    const scorePath = getScoresPathForScope(scope) + "/" + cleanNick;

    try {
      await db.ref(scorePath).transaction(function (current) {
        const currentScore = normalizeScore(
          current && typeof current === "object" && !Array.isArray(current) ? current.wynik : current
        );
        const currentSavedAt = normalizeSavedAt(
          current && typeof current === "object" && !Array.isArray(current) ? current.savedAt : null,
          now
        );

        if (current === null || isExpired(currentSavedAt, now) || numericScore > currentScore) {
          return {
            wynik: numericScore,
            savedAt: now
          };
        }

        if (!current || typeof current !== "object" || Array.isArray(current)) {
          return {
            wynik: currentScore,
            savedAt: currentSavedAt
          };
        }

        return current;
      });
      return true;
    } catch (error) {
      console.warn("Nie udalo sie zapisac wyniku do Firebase:", error);
      return false;
    }
  }

  async function fetchEntries(options) {
    const scope = getLeaderboardScope(options);
    const localEntries = getLocalEntries(scope);
    const remoteEntries = await fetchRemoteEntries(scope);
    return mergeEntries(localEntries.concat(remoteEntries));
  }

  async function saveScore(nick, score, options) {
    const scope = getLeaderboardScope(options);
    const saved = saveLocalScore(nick, score, scope);
    await saveRemoteScore(saved.nick, saved.wynik, scope);
    return saved;
  }

  async function pobierzNajlepszy(options) {
    const entries = await fetchEntries(options);
    const bestScore = entries.length ? entries[0].wynik : 0;
    const scoreEl = document.getElementById("score");
    if (scoreEl) {
      scoreEl.innerText = bestScore;
    }
    return bestScore;
  }

  function getScopeLabel(scope) {
    if (scope && scope.partyCode) {
      return " (" + scope.partyCode + ")";
    }
    return "";
  }

  function applyLeaderboardTranslations(options) {
    const scope = getLeaderboardScope(options);
    const copy = getTranslations();
    const title = document.getElementById("best");
    const closeBtn = document.getElementById("closeLeaderboard");
    const leaderboard = document.getElementById("leaderboard");

    if (title) {
      title.textContent = copy.title + getScopeLabel(scope);
    }

    if (closeBtn) {
      closeBtn.textContent = copy.close;
    }

    if (leaderboard) {
      leaderboard.dir = getLanguage() === "he" ? "rtl" : "ltr";
    }
  }

  function renderEntries(entries) {
    const list = document.getElementById("scoresList");
    const copy = getTranslations();
    if (!list) return;

    list.innerHTML = "";

    if (!entries.length) {
      const li = document.createElement("li");
      li.textContent = copy.empty;
      list.appendChild(li);
      return;
    }

    entries.slice(0, 10).forEach(function (entry, index) {
      const li = document.createElement("li");
      li.textContent = entry.nick + ": " + entry.wynik + " " + copy.points;
      list.appendChild(li);
    });
  }

  async function pokazNajlepszeWyniki(options) {
    const scope = getLeaderboardScope(options);
    applyLeaderboardTranslations(scope);
    const entries = await fetchEntries(scope);
    renderEntries(entries);

    const leaderboard = document.getElementById("leaderboard");
    if (leaderboard) {
      leaderboard.style.display = "block";
    }

    return entries;
  }

  function ukryjNajlepszeWyniki() {
    const leaderboard = document.getElementById("leaderboard");
    if (leaderboard) {
      leaderboard.style.display = "none";
    }
  }

  function formatRemainingTime(expiresAt) {
    const remainingMs = normalizeSavedAt(expiresAt, Date.now()) - Date.now();
    if (remainingMs <= 0) return "expired";

    const totalMinutes = Math.ceil(remainingMs / 60000);
    const days = Math.floor(totalMinutes / 1440);
    const hours = Math.floor((totalMinutes % 1440) / 60);
    const minutes = totalMinutes % 60;
    const parts = [];

    if (days > 0) parts.push(days + "d");
    if (hours > 0) parts.push(hours + "h");
    if (minutes > 0 && days === 0) parts.push(minutes + "m");

    return parts.join(" ");
  }

  async function resolveCurrentScopeForUi() {
    const codeFromUrl = getPartyCodeFromUrl();
    if (codeFromUrl) {
      const partyFromUrl = await fetchPartyMeta(codeFromUrl);
      if (partyFromUrl && !isPartyExpired(partyFromUrl.expiresAt)) {
        setCurrentPartyCode(partyFromUrl.code);
        return getLeaderboardScope({ partyCode: partyFromUrl.code });
      }
    }

    const currentParty = await getCurrentPartyMeta();
    if (currentParty) {
      return getLeaderboardScope({ partyCode: currentParty.code });
    }

    return getLeaderboardScope(null);
  }

  function bindLeaderboardUi() {
    const showBtn = document.getElementById("showLeaderboardBtn");
    const closeBtn = document.getElementById("closeLeaderboard");

    applyLeaderboardTranslations();

    if (showBtn && !showBtn.dataset.leaderboardBound) {
      showBtn.dataset.leaderboardBound = "1";
      showBtn.addEventListener("click", function () {
        resolveCurrentScopeForUi()
          .then(function (scope) {
            return pokazNajlepszeWyniki(scope);
          })
          .catch(function (error) {
            console.error("Blad wyswietlania rankingu:", error);
          });
      });
    }

    if (closeBtn && !closeBtn.dataset.leaderboardBound) {
      closeBtn.dataset.leaderboardBound = "1";
      closeBtn.addEventListener("click", ukryjNajlepszeWyniki);
    }
  }

  function onReady(callback) {
    if (document.readyState === "loading") {
      document.addEventListener("DOMContentLoaded", callback, { once: true });
    } else {
      callback();
    }
  }

  window.Leaderboard = {
    applyTranslations: applyLeaderboardTranslations,
    clearCurrentParty: clearCurrentParty,
    createParty: createParty,
    fetchEntries: fetchEntries,
    fetchPartyMeta: fetchPartyMeta,
    formatRemainingTime: formatRemainingTime,
    getCurrentPartyCode: getCurrentPartyCode,
    getCurrentPartyMeta: getCurrentPartyMeta,
    getPartyCodeFromUrl: getPartyCodeFromUrl,
    getPartyCountryOptions: function () {
      return PARTY_COUNTRY_OPTIONS.slice();
    },
    getPartyDurationLimits: function () {
      return {
        minMinutes: PARTY_MIN_DURATION_MINUTES,
        maxMinutes: PARTY_MAX_DURATION_MINUTES
      };
    },
    getSavedNick: getSavedNick,
    getScope: getLeaderboardScope,
    isPartyExpired: isPartyExpired,
    joinParty: joinParty,
    pobierzNajlepszy: pobierzNajlepszy,
    sanitizeNick: sanitizeNick,
    saveScore: saveScore,
    setCurrentPartyCode: setCurrentPartyCode,
    setSavedNick: setSavedNick,
    show: pokazNajlepszeWyniki,
    hide: ukryjNajlepszeWyniki
  };

  window.zapiszWynik = function (nick, score, options) {
    return saveScore(nick, score, options);
  };
  window.pobierzNajlepszy = pobierzNajlepszy;
  window.pokazNajlepszeWyniki = pokazNajlepszeWyniki;

  onReady(bindLeaderboardUi);
})();
