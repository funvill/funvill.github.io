---
title: "Dump a CListCtrl"
date: 2009-05-11 15:41:00
categories:
- Devlopment
tags:
- code
- cpp
- MFC
- programing
- snippet
- Tips
slug: dump-a-clistctrl

---

This snippet dumps the content of a CListCtrl in to a file.   <br />It also gets the number of columns in the list.&#160;&#160; <blockquote>   <p>int GetColumnsCount( CListCtrl * list )      <br />{       <br />&#160;&#160;&#160; if( list != NULL )       <br />&#160;&#160;&#160; {       <br />&#160;&#160;&#160;&#160;&#160;&#160;&#160; const CHeaderCtrl * pHeaderCtrl = (CHeaderCtrl*) list-&gt;GetDlgItem(0);       <br />&#160;&#160;&#160;&#160;&#160;&#160;&#160; if( pHeaderCtrl != NULL ) {       <br />&#160;&#160;&#160;&#160;&#160;&#160;&#160;&#160;&#160;&#160;&#160; return&#160; pHeaderCtrl-&gt;GetItemCount() ;       <br />&#160;&#160;&#160;&#160;&#160;&#160;&#160; }&#160;&#160;&#160;&#160;&#160;&#160;&#160; <br />&#160;&#160;&#160; }       <br />&#160;&#160;&#160; return 0;       <br />} </p>    <p>void DumpList( FILE * file, CListCtrl * list )      <br />{       <br />&#160;&#160;&#160; if( file == NULL &amp;&amp; list&#160; == NULL )       <br />&#160;&#160;&#160; {       <br />&#160;&#160;&#160;&#160;&#160;&#160;&#160; return ;       <br />&#160;&#160;&#160; } </p>    <p>&#160;&#160;&#160; CString csText ;      <br />&#160;&#160;&#160; int columnCount = GetColumnsCount( list );       <br />&#160;&#160;&#160; for( int iRows = 0 ; iRows &lt; list-&gt;GetItemCount() ; iRows++ )       <br />&#160;&#160;&#160; {       <br />&#160;&#160;&#160;&#160;&#160;&#160;&#160; for( int iCols = 0 ; iCols &lt; columnCount ; iCols++ )       <br />&#160;&#160;&#160;&#160;&#160;&#160;&#160; {       <br />&#160;&#160;&#160;&#160;&#160;&#160;&#160;&#160;&#160;&#160;&#160; csText = list-&gt;GetItemText( iRows, iCols ) ;       <br />&#160;&#160;&#160;&#160;&#160;&#160;&#160;&#160;&#160;&#160;&#160; fprintf_s( file, &quot;%s,&quot;, csText );       <br />&#160;&#160;&#160;&#160;&#160;&#160;&#160; }       <br />&#160;&#160;&#160;&#160;&#160;&#160;&#160; fprintf_s( file, &quot;\n&quot; );       <br />&#160;&#160;&#160; }       <br />}</p></blockquote>
