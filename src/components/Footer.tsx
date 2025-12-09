export default function Footer() {
  return (
    <footer className="bg-light mt-5 py-4">
      <div className="container text-center">
        <small className="text-muted">© {new Date().getFullYear()} newsradar — Austria</small>
      </div>
    </footer>
  );
}
