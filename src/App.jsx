import React, { useState, useEffect } from "react";
import { FaInstagram, FaGithub, FaEnvelope } from "react-icons/fa";
import { subjects } from "./data";

export default function App() {
  const [subject, setSubject] = useState("");
  const [year, setYear] = useState("");
  const [semester, setSemester] = useState("Spring");
  const [examType, setExamType] = useState("End");

  const [showDropdown, setShowDropdown] = useState(false);
  const [filteredSubjects, setFilteredSubjects] = useState([]);

  const [displayText, setDisplayText] = useState("");
  const text = "NITR PYQS FETCHER";

  // typing effect
  useEffect(() => {
    let i = 0;
    const interval = setInterval(() => {
      setDisplayText(text.slice(0, i + 1));
      i++;
      if (i >= text.length) clearInterval(interval);
    }, 70);
    return () => clearInterval(interval);
  }, []);

  // close dropdown on outside click
  useEffect(() => {
    const handleClickOutside = () => setShowDropdown(false);
    window.addEventListener("click", handleClickOutside);
    return () => window.removeEventListener("click", handleClickOutside);
  }, []);

  const generateLink = () => {
    if (!subject || !year) return alert("Bhosdi ke, भोसड़ी , ଭୋସଡି କେ , 请填写所有必填字段。, போஸ்டி கே , ഭോസ്ഡി കെ");

    let yearPart = "";

    if (semester === "Summer") {
      yearPart = `${year} (${semester})`;
    } else {
      const nextYear = parseInt(year) + 1;
      yearPart = `${year}-${nextYear.toString().slice(-2)} (${semester})`;
    }

    const url = `https://eapplication.nitrkl.ac.in/nitris/docs/Examination/QuestionPaperUpload/${encodeURIComponent(
      yearPart
    )}/${examType}%20Semester/${subject.toUpperCase()}.pdf`;

    window.open(url, "_blank");
  };

  return (
    <div style={styles.page}>
      <style>
        {`
          @keyframes blink { 50% { opacity: 0; } }
        `}
      </style>

      <div style={styles.card}>
        <h1 style={styles.title}>
          {displayText}
          <span style={styles.cursor}>|</span>
        </h1>

        <div style={styles.form}>
          {/* SUBJECT INPUT + DROPDOWN */}
          <div onClick={(e) => e.stopPropagation()}>
            <input
              placeholder="Subject Code or Name"
              value={subject}
              onChange={(e) => {
                const value = e.target.value;
                setSubject(value);

                if (value.trim() !== "") {
                  const filtered = subjects.filter(
                    (sub) =>
                      sub.code.toLowerCase().includes(value.toLowerCase()) ||
                      sub.name.toLowerCase().includes(value.toLowerCase())
                  );

                  setFilteredSubjects(filtered);
                  setShowDropdown(true);
                } else {
                  setShowDropdown(false);
                }
              }}
              onFocus={() => subject && setShowDropdown(true)}
              style={styles.input}
            />

            {showDropdown && (
              <div style={styles.dropdown}>
                {filteredSubjects.length > 0 ? (
                  filteredSubjects.map((sub, index) => (
                    <div
                      key={index}
                      style={styles.dropdownItem}
                      onClick={() => {
                        setSubject(sub.code);
                        setShowDropdown(false);
                      }}
                      onMouseEnter={(e) =>
                        (e.currentTarget.style.background = "#00f0ff22")
                      }
                      onMouseLeave={(e) =>
                        (e.currentTarget.style.background = "transparent")
                      }
                    >
                      <div style={styles.code}>{sub.code}</div>
                      <div style={styles.name}>{sub.name}</div>
                    </div>
                  ))
                ) : (
                  <div style={styles.noResult}>No subjects found</div>
                )}
              </div>
            )}
          </div>

          {/* YEAR */}
          <input
            placeholder="Year (2023)"
            value={year}
            onChange={(e) => setYear(e.target.value)}
            style={styles.input}
          />

          {/* SEMESTER */}
          <select
            value={semester}
            onChange={(e) => setSemester(e.target.value)}
            style={styles.input}
          >
            <option>Spring</option>
            <option>Autumn</option>
            <option>Summer</option>
          </select>

          {/* EXAM TYPE */}
          <select
            value={examType}
            onChange={(e) => setExamType(e.target.value)}
            style={styles.input}
          >
            <option>End</option>
            <option>Mid</option>
          </select>

          <button onClick={generateLink} style={styles.button}>
            OPEN PAPER
          </button>
        </div>

        <br />

        <div style={styles.footer}>
          <a
            href="https://instagram.com/himanshupradhann"
            target="_blank"
            rel="noreferrer"
          >
            <FaInstagram />
          </a>
          <a
            href="https://github.com/himanshupradhann"
            target="_blank"
            rel="noreferrer"
          >
            <FaGithub />
          </a>
          <a href="mailto:pradhangagan85@gmail.com">
            <FaEnvelope />
          </a>
        </div>
      </div>
    </div>
  );
}

const styles = {
  page: {
    minHeight: "100vh",
    background: "#0a0a0f",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    padding: "15px",
    fontFamily: "sans-serif",
  },

  card: {
    width: "100%",
    maxWidth: "380px",
    background: "#111",
    padding: "20px",
    borderRadius: "18px",
    boxShadow: "0 0 20px #00f0ff33",
    border: "1px solid #00f0ff22",
  },

  title: {
    color: "#00f0ff",
    textAlign: "center",
    marginBottom: "15px",
    fontSize: "20px",
  },

  cursor: {
    animation: "blink 1s infinite",
  },

  form: {
    display: "flex",
    flexDirection: "column",
    gap: "10px",
  },

  input: {
    width: "100%",
    padding: "12px",
    borderRadius: "10px",
    border: "1px solid #00f0ff55",
    background: "#111",
    color: "#fff",
    fontSize: "14px",
  },

  dropdown: {
    marginTop: "5px",
    background: "#0f0f15",
    border: "1px solid #00f0ff33",
    borderRadius: "10px",
    maxHeight: "180px",
    overflowY: "auto",
    boxShadow: "0 0 12px #00f0ff22",
  },

  dropdownItem: {
    padding: "10px",
    cursor: "pointer",
    borderBottom: "1px solid #00f0ff11",
    transition: "0.2s",
  },

  code: {
    color: "#00f0ff",
    fontWeight: "600",
  },

  name: {
    fontSize: "12px",
    color: "#aaa",
  },

  noResult: {
    padding: "10px",
    color: "#888",
    textAlign: "center",
  },

  button: {
    marginTop: "5px",
    padding: "14px",
    borderRadius: "12px",
    border: "none",
    background: "#00f0ff",
    color: "#000",
    fontWeight: "700",
    fontSize: "15px",
    cursor: "pointer",
  },

  footer: {
    marginTop: "15px",
    display: "flex",
    justifyContent: "center",
    gap: "25px",
    fontSize: "22px",
  },
};
