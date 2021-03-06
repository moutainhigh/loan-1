package com.company.common.service.impl;

import java.io.Serializable;

import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.core.userdetails.UserDetails;

import com.company.common.dao.BaseDao;
import com.company.common.service.BaseService;

public abstract class BaseServiceImpl<T, ID extends Serializable> implements BaseService<T, ID> {
	public int deleteByID(ID id) {
		return getMapper().deleteByPrimary(id);
	}

	public long insert(T record) {
		return getMapper().insert(record);
	}

	public T getById(ID id) {
		return getMapper().getByPrimary(id);
	}

	public int updateById(T record) {
		return getMapper().update(record);
	}

	public abstract BaseDao<T, ID> getMapper();

	protected String getLoginName() {
		UserDetails user = (UserDetails) SecurityContextHolder.getContext().getAuthentication().getPrincipal();
		return user.getUsername();
	}

}
