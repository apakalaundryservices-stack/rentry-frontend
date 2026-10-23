"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { ArrowLeft, ArrowRight, Check, Heart, MessageCircle, Minus, Plus, ShieldCheck, ShoppingCart, Truck, Wrench } from "lucide-react";
import { kes, products, type Product } from "@/lib/products";
import { useStore } from "@/lib/store";
import { CartPanel } from "@/app/cart-panel";

const waNumber = process.env.NEXT_PUBLIC_WHATSAPP_NUMBER || "254717157044";

export default function ProductDetail({ product }: { product: Product }) {
  const [qty, setQty] = useState(1);
  const [variant, setVariant] = useState(product.specs[0]);
  const [toast, setToast] = useState("");
  const [cartOpen, setCartOpen] = useState(false);
  const add = useStore((state) => state.add);
  const liked = useStore((state) => state.wishlist.includes(product.id));
  const toggleWish = useStore((state) => state.toggleWish);
  useEffect(() => { const open = () => setCartOpen(true); window.addEventListener("rentry:open-cart", open); return () => window.removeEventListener("rentry:open-cart", open); }, []);
  const show = (message: string) => { setToast(message); setTimeout(() => setToast(""), 2200); };
  const message = `Hello Rentry Engineering, I'm interested in ${product.name}. Option: ${variant}. Quantity: ${qty}. Please confirm availability and delivery.`;

  return <main className="product-page">
    <header className="header"><div className="wrap nav"><Link href="/" className="brand"><span className="brandmark"><Wrench size={22}/></span><span className="brandcopy"><b>RENTRY ENGINEERING</b><span>TOOLS THAT MEAN BUSINESS</span></span></Link><Link href="/" className="text-link"><ArrowLeft size={14}/> Back to shop</Link></div></header>
    <div className="wrap" style={{ paddingTop: 28 }}><div className="section-kicker">{product.category} / {product.brand}</div><div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 46, padding: "22px 0 60px" }} className="detail-grid">
      <div style={{ position: "relative", background: "#f5f6f7", minHeight: 430, borderRadius: 8, padding: 25 }}><img src={product.image} alt={product.name} style={{ width: "100%", height: 430, objectFit: "contain", mixBlendMode: "multiply" }}/><span className="product-badge">{product.stockCountKnown===false?"In stock · quantity needed":product.badge}</span></div>
      <section style={{ padding: "10px 0" }}><span className="product-brand">{product.brand} · {product.category}</span><h1 style={{ font: "800 32px/1.2 Manrope", letterSpacing: "-1px", margin: "10px 0" }}>{product.name}</h1><div className="product-rating">★★★★★ <span>{product.rating} · Verified engineering grade</span></div><div style={{ font: "800 25px Manrope", margin: "22px 0 5px" }}>{kes(product.price)}</div><div style={{ color: "#7b8594", fontSize: 11 }}>Delivery quoted at checkout · Prices and bulk rates can be confirmed by WhatsApp.</div>{product.imageCredit&&<small style={{display:"block",marginTop:6,color:"#8993a2"}}>Image credit: {product.imageCredit}</small>}<p style={{ color: "#667285", fontSize: 13, lineHeight: 1.8, margin: "20px 0" }}>{product.description}</p>
        <div className="field"><label htmlFor="variant">Choose configuration</label><select id="variant" value={variant} onChange={(event) => setVariant(event.target.value)} style={{ padding: 12, border: "1px solid #dfe3e8", borderRadius: 4, background: "white", fontSize: 12 }}>{product.specs.map((spec) => <option key={spec}>{spec}</option>)}</select></div>
        <div style={{ display: "flex", gap: 12, alignItems: "center", margin: "18px 0" }}><div className="qty" style={{ margin: 0 }}><button disabled={product.stockCountKnown===false||qty<=1} onClick={() => setQty(Math.max(1, qty - 1))}><Minus size={12}/></button><span style={{ minWidth: 15, textAlign: "center" }}>{qty}</span><button disabled={product.stockCountKnown===false||qty>=product.stock} onClick={() => setQty(Math.min(product.stock, qty + 1))}><Plus size={12}/></button></div><span style={{ fontSize: 11, color: product.stock ? "#24804a" : "#a53b3b" }}>{product.stockCountKnown===false?"Marked in stock · quantity needs confirmation":product.stock ? `In stock · ${product.stock} available` : "Currently unavailable"}</span></div>
        <button className="btn btn-primary" style={{ width: "100%", padding: 15 }} disabled={!product.stock||product.stockCountKnown===false} onClick={() => { for (let i = 0; i < qty; i++) add(product); setCartOpen(true); }}><ShoppingCart size={16}/> Add to cart · {kes(product.price * qty)}</button>
        <a className="btn" style={{ width: "100%", marginTop: 9, background: "#eaf8ef", color: "#16884b", padding: 14 }} href={`https://wa.me/${waNumber}?text=${encodeURIComponent(message)}`} target="_blank" rel="noreferrer"><MessageCircle size={16}/> Inquire via WhatsApp</a>
        <a className="text-link" style={{ marginTop: 18 }} href={`https://wa.me/${waNumber}?text=${encodeURIComponent(`Hi, I'd like to ask about Lipa Polepole or trade-in options for ${product.name}.`)}`} target="_blank" rel="noreferrer">Ask about Lipa Polepole / trade-in <ArrowRight size={14}/></a>
        <button className="iconbtn" style={{ display: "flex", gap: 7, marginTop: 18, fontSize: 11 }} onClick={() => { toggleWish(product.id); show(liked ? "Removed from saved items" : "Saved for later"); }}><Heart size={16} fill={liked ? "#e66a67" : "none"} color={liked ? "#e66a67" : "currentColor"}/> {liked ? "Saved" : "Save for later"}</button>
        <div style={{ display: "flex", gap: 20, marginTop: 26, paddingTop: 18, borderTop: "1px solid #e7e9ed", color: "#667285", fontSize: 10 }}><span><ShieldCheck size={15}/> Genuine & warrantied</span><span><Truck size={15}/> Kenya-wide delivery</span></div>
      </section></div>
      <section style={{ borderTop: "1px solid #e7e9ed", padding: "30px 0 60px" }}><span className="section-kicker">Technical details</span><h2 style={{ font: "800 24px Manrope", margin: "8px 0 18px" }}>Specifications</h2><div style={{ display: "grid", gridTemplateColumns: "repeat(2,1fr)", gap: 10 }}>{product.specs.map((spec) => <div key={spec} style={{ background: "#f7f8f9", padding: 15, fontSize: 12 }}><Check size={14} color="#c98400" style={{ display: "inline", marginRight: 8 }}/>{spec}</div>)}</div></section>
      <section style={{ borderTop: "1px solid #e7e9ed", padding: "30px 0 60px" }}><span className="section-kicker">More to explore</span><h2 style={{ font: "800 24px Manrope", margin: "8px 0 18px" }}>Related equipment</h2><div className="product-grid">{products.filter((p) => p.id !== product.id).slice(0, 4).map((item) => <Link className="product-card" href={`/products/${item.id}`} key={item.id}><div className="product-img"><img src={item.image} alt={item.name}/></div><div className="product-info"><div className="product-brand">{item.brand}</div><h3>{item.name}</h3><div className="product-price">{kes(item.price)}</div></div></Link>)}</div></section>
    </div>{toast && <div className="toast">{toast}</div>}
    <CartPanel open={cartOpen} onClose={() => setCartOpen(false)} onCheckout={() => { window.location.assign("/#cart"); }} onWhatsApp={() => window.open(`https://wa.me/${waNumber}?text=${encodeURIComponent(message)}`, "_blank", "noopener,noreferrer")}/>
  </main>;
}
