---
title: "How to create a menu and submenu on right click in MFC"
date: 2009-05-05 11:20:00
categories:
- Development
tags:
- MFC
- programing
- snippet
- Tips
slug: how-to-create-a-menu-and-submenu-on-right-click-in-mfc

---

<p>&#160;</p>  <blockquote>   <p>void ::OnNMRClickBacnetTree(NMHDR *pNMHDR, LRESULT *pResult)      <br />{       <br />&#160;&#160;&#160; CPoint ptScreen;       <br />&#160;&#160;&#160; SendMessage(WM_CONTEXTMENU, (WPARAM) m_hWnd, GetMessagePos() );       <br />&#160;&#160;&#160; if (! GetCursorPos(&amp;ptScreen))       <br />&#160;&#160;&#160; {       <br />&#160;&#160;&#160;&#160;&#160;&#160;&#160; return ;       <br />&#160;&#160;&#160; } </p>    <p>&#160;&#160;&#160; // Select an element under the right click      <br />&#160;&#160;&#160; CPoint ptClient(ptScreen);       <br />&#160;&#160;&#160; m_BACnetTree.ScreenToClient(&amp;ptClient);&#160;&#160;&#160; </p>    <p>&#160;&#160;&#160; // Create the right click menu      <br />&#160;&#160;&#160; CMenu rightClickMenu;       <br />&#160;&#160;&#160; rightClickMenu.CreatePopupMenu();       <br />&#160;&#160;&#160; rightClickMenu.AppendMenu(MF_STRING,1021,_T(&quot;One&quot;));       <br />&#160;&#160;&#160; rightClickMenu.AppendMenu(MF_STRING,1022,_T(&quot;Two&quot;));       <br />&#160;&#160;&#160; rightClickMenu.AppendMenu(MF_STRING,1023,_T(&quot;Three&quot;)); </p>    <p>&#160;&#160;&#160; // Create the sub menu      <br />&#160;&#160;&#160; CMenu rightClickMenuAdvanced;       <br />&#160;&#160;&#160; rightClickMenuAdvanced.CreatePopupMenu();       <br />&#160;&#160;&#160; rightClickMenuAdvanced.AppendMenu(MF_STRING,1024,_T(&quot;one&quot;));       <br />&#160;&#160;&#160; rightClickMenuAdvanced.AppendMenu(MF_STRING,1025,_T(&quot;two&quot;)); </p>    <p>&#160;&#160;&#160; // Add the sub menu to the right click menu      <br />&#160;&#160;&#160; if (rightClickMenuAdvanced.GetMenuItemCount() &gt; 0 )       <br />&#160;&#160;&#160; {       <br />&#160;&#160;&#160;&#160;&#160;&#160;&#160; rightClickMenu.AppendMenu(MF_POPUP|MF_STRING,(UINT) rightClickMenuAdvanced.m_hMenu, _T(&quot;Advanced&quot;) );       <br />&#160;&#160;&#160; }       <br />&#160;&#160;&#160; rightClickMenuAdvanced.DestroyMenu(); </p>    <p>&#160;&#160;&#160; rightClickMenu.TrackPopupMenu (TPM_RIGHTBUTTON, ptScreen.x, ptScreen.y, this);      <br />&#160;&#160;&#160; rightClickMenu.DestroyMenu( );       <br />}</p></blockquote>
