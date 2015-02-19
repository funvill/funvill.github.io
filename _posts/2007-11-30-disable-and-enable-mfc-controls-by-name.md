---
layout: post
title: Disable and Enable MFC controls by name 
date: 2007-11-30 12:25
author: funvill
comments: true
categories: [Development, Tips and Tricks]
---
I use this snippet all the time to disable/enable, hide/show, move MFC controls.

<code>
// Enables and disables an MFC control by name
void CCILikeChease::EnableControl( int iControl, bool enable )
{
// Enable Control
</code><code>Â Â Â Â  </code><code>CWnd* wnd_control = (CWnd*)( GetDlgItem( iControl ) );
</code><code>Â Â Â Â  </code><code> if( wnd_control != NULL ) {
</code><code>Â Â Â Â  </code><code>Â Â Â Â  </code><code> wnd_control-&gt;EnableWindow( enable ) ;
</code><code>Â Â Â Â  </code><code> }
}
void CNetworkDlg::HideControl( int iControl, bool show )
{
</code><code>Â Â Â Â  </code><code> // Hide the Control
</code><code>Â Â Â Â  </code><code> CWnd* wnd_control = (CWnd*)( GetDlgItem( iControl ) );
</code><code>Â Â Â Â  </code><code> if( wnd_control != NULL ) {
</code><code>Â Â Â Â  </code><code>Â Â Â Â  </code><code> if(  show ) {
</code><code>Â Â Â Â  </code><code>Â Â Â Â  </code><code>Â Â Â Â  </code><code> wnd_control-&gt;ShowWindow( SW_SHOW ) ;
</code><code>Â Â Â Â  </code><code>Â Â Â Â  </code><code> } else {
</code><code>Â Â Â Â  </code><code>Â Â Â Â  </code><code>Â Â Â Â  </code><code> wnd_control-&gt;ShowWindow( SW_HIDE ) ;
</code><code>Â Â Â Â  </code><code>Â Â Â Â  </code><code>}
</code><code>Â Â Â Â  </code><code> }
}
void CNetworkDlg::MoveControl( int iControl, int top, int left, int sizex, int sizey  )
{
</code><code>Â Â Â Â  </code><code> // Move the control
</code><code>Â Â Â Â  </code><code> CWnd* wnd_control = (CWnd*)( GetDlgItem( iControl ) );
</code><code>Â Â Â Â  </code><code> if( wnd_control != NULL ) {
</code><code>Â Â Â Â  </code><code>Â Â Â Â  </code><code> LPRECT lpRect = new RECT ;
</code><code>Â Â Â Â  </code><code>Â Â Â Â  </code><code> wnd_control-&gt;GetClientRect( lpRect ) ;
</code><code>Â Â Â Â  </code><code> </code><code>Â Â Â Â  </code><code>lpRect-&gt;top		= top;
</code><code>Â Â Â Â  </code><code>Â Â Â Â  </code><code> lpRect-&gt;left	= left;
</code><code>Â Â Â Â  </code><code>Â Â Â Â  </code><code> if( sizex &gt; 0 || sizey &gt; 0 ) {
</code><code>Â Â Â Â  </code><code>Â Â Â Â  </code><code>Â Â Â Â  </code><code> lpRect-&gt;right   = sizex + left ;
</code><code>Â Â Â Â  </code><code>Â Â Â Â  </code><code>Â Â Â Â  </code><code> lpRect-&gt;bottom  = sizey + top;
</code><code>Â Â Â Â  </code><code>Â Â Â Â  </code><code> }
</code><code>Â Â Â Â  </code><code>Â Â Â Â  </code><code> wnd_control-&gt;MoveWindow( lpRect ) ;
</code><code>Â Â Â Â  </code><code>Â Â Â Â  </code><code> delete lpRect ;
</code><code>Â Â Â Â  </code><code> }
}
</code>
